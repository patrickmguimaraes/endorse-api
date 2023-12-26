import httpStatus from 'http-status';
import Token from '../models/token.model';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import Post from '../models/post.model';
import Follower from '../models/follower.model';
import { Op, Sequelize } from 'sequelize';
import View from '../models/view.model';
import Person from '../models/person.model';
import Company from '../models/company.model';
import Article from '../models/article.model';
import Idea from '../models/idea.model';
import File from '../models/file.model';
import Power from '../models/power.model';
import Endorse from '../models/endorse.model';
import Converter from 'number-to-words';
import EndorseView from '../models/endorse-view.model';
import Showcase from '../models/showcase.model';
import Tag from '../models/tag.model';

class PostRepository {
  async getPostById(id: number) {
    const post = await Post.findOne({
      where: {
        id: id
      }
    })

    return post;
  };

  async getPost(userId: number, code: string) {
    const post = await Post.findOne({
      where: {
        link: code,
        status: "Posted",
        userId
      },
      include: [
        {
          model: User,
          include: [{ model: Person, as: 'person' }, { model: Company, as: 'company' }]
        },
        { model: Article, as: 'article' },
        { model: Idea, as: 'idea' },
        { model: File, as: 'files' },
        { model: Power, as: 'powersObject' },
        { model: Endorse, as: 'endorsementsObject' },
        { 
          model: Showcase, 
          as: 'showcase',
          include: [
            { model: File },
            { model: Tag }
          ]
        }
      ]
    })

    return post;
  };


  async post(post: Post) {
    post.date = new Date();

    const exists = await Post.findOne({ where: { link: post.link, userId: post.userId, status: "Posted" } });

    if (!exists) {
      const result = await Post.create({ ...post }, { include: [{ all: true }] });

      await Post.update(
        { link: result.link },
        { where: { id: result.id } }
      );

      if (!result) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error ocurred while saving your post. Try later.');
      }

      return result;
    }
    else {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'You have an active idea with this name.');
    }
  };

  async newsFeed(userId: number, meId: number, page: number, feedOnlyThisUser: boolean) {
    try {
      var following = [];
      var followingIds: any[] = [];
      var views = [];
      var viewsIds: any[] = [];
      var viewsEndorse = [];
      var viewsEndorseIds: any[] = [];

      if (!feedOnlyThisUser) {
        following = await Follower.findAll({
          where: { followerId: userId },
          attributes: ['followedId'],
        });

        followingIds = following.map((user) => user.followedId);

        views = await View.findAll({
          where: { userId },
          attributes: ['postId'],
        });

        viewsIds = views.map((view) => view.postId);

        viewsEndorse = await EndorseView.findAll({
          where: { userId },
          attributes: ['endorseId'],
        });

        viewsEndorseIds = viewsEndorse.map((view) => view.endorseId);
      }

      const endorsements = await Endorse.findAll({
        where: {
          userId: {
            [Op.or]: [userId, ...followingIds]
          },
          id: {
            [Op.notIn]: [...viewsEndorseIds],
          },
          status: 'Posted'
        }
      });

      const postsAlredyColectedIds = endorsements.map((endorse) => endorse.postId);

      const posts = await Post.findAll({
        subQuery: false,
        where: {
          [Op.or]: {
            [Op.and]: {
              status: 'Posted',
              id: {
                [Op.notIn]: [...viewsIds],
              },
              userId: {
                [Op.or]: [userId, ...followingIds]
              },
            },
            id: {
              [Op.in]: [...postsAlredyColectedIds]
            }
          }
        },
        include: [
          {
            model: User,
            include: [{ model: Person, as: 'person' }, { model: Company, as: 'company' }]
          },
          { model: Article, as: 'article' },
          { model: Idea, as: 'idea' },
          { model: File, as: 'files' },
          {
            required: false,
            model: Power,
            as: "powersObject",
            where: {
              userId: meId
            },
          },
          {
            required: false,
            model: Endorse,
            where: {
              userId: meId
            },
            include: [
              {
                model: User,
                include: [{ model: Person, as: 'person' }, { model: Company, as: 'company' }]
              },
            ],
          },
        ],
        order: [
          [Sequelize.cast(Sequelize.literal('COALESCE(endorsementsObject.date, `Post`.date)'), 'char'), 'DESC']
        ],
        limit: 5,
        offset: (page - 1) * 5,
        //logging: console.log
      });

      return posts;
    } catch (error: any) {
      console.log(error.message)
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'An error ocurred while getting your news feed. Try later.');
    }
  };

  async viewed(userId: number, postId: number, endorseId: number | null) {
    if (!endorseId) {
      const [view, created] = await View.findOrCreate({
        where: { userId: userId, postId: postId }
      });

      if (created) {
        return view;
      }
      else {
        return null;
      }
    }
    else {
      const [view, created] = await EndorseView.findOrCreate({
        where: { userId: userId, endorseId: endorseId }
      });

      if (created) {
        return view;
      }
      else {
        return null;
      }
    }
  };

  async power(userId: number, postId: number) {
    const check = await Power.findOne({ where: { userId: userId, postId: postId } });
    const post = await Post.findOne({ where: { id: postId } });

    if (!check) {
      const result = await Power.create({ userId: userId, postId: postId });

      await Post.update(
        { powers: post?.powers! + 1 },
        { where: { id: post?.id } }
      );

      return { power: result, powers: post?.powers! + 1 };
    }
    else {
      return { power: check, powers: post?.powers! };
    }
  };

  async unpower(userId: number, postId: number) {
    const result = await Power.findOne({ where: { userId, postId } });
    const post = await Post.findOne({ where: { id: postId } });

    if (result) {
      await Post.update(
        { powers: post?.powers! - 1 },
        { where: { id: post?.id } }
      );

      result?.destroy();

      return { unpower: result, powers: post?.powers! - 1 };
    }
    else {
      return { unpower: result, powers: post?.powers! };
    }
  };

  async endorse(endorse: Endorse) {
    endorse.date = new Date();

    const result = await Endorse.create({ ...endorse });
    const post = await Post.findOne({ where: { id: endorse.postId } });

    if (result) {
      await Post.update(
        { endorsements: post?.endorsements! + 1 },
        { where: { id: post?.id } }
      );
    }

    return result
  };

  async poweredAndEndorsed(userId: number, postId: number) {
    const power = await Power.findOne({ where: { userId: userId, postId: postId } });
    const endorse = await Endorse.findOne({ where: { userId: userId, postId: postId } });

    return { power: power, endorse: endorse }
  };

  async getPostName(userId: number) {
    const num: number = await Post.count({ where: { userId: userId } });
    const word: string = Converter.toWordsOrdinal(num + 1);

    return { word: word + "-idea" };
  };

  async saveShowcase(showcase: any) {
    const show = await Showcase.create({ ...showcase }, { include: [{ all: true }] });
    return show;
  };

  async update(postId: number, fields: any): Promise<number> {
    try {
      const affectedRows = await Post.update(
        { ...fields },
        { where: { id: postId } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Post!");
    }
  }

  async updateShowcase(showcaseId: number, fields: any): Promise<number> {
    try {
      const affectedRows = await Showcase.update(
        { ...fields },
        { where: { id: showcaseId } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Showcase!");
    }
  }
}

export default new PostRepository()