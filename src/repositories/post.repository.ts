import httpStatus from 'http-status';
import Token from '../models/token.model';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import Post from '../models/post.model';
import Follower from '../models/follower.model';
import { Model, Op, Sequelize } from 'sequelize';
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
import ShowcaseTag from '../models/showcase-tag.model';
import Category from '../models/category.model';
import CollaborationTag from '../models/collaboration-tag.model';
import Collaboration from '../models/collaboration.model';
import CollaborationCategory from '../models/collaboration-category.model';
import CollaborationRequest from '../models/collaboration-request.model';

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
            { model: Category },
            { model: File },
            { model: ShowcaseTag, include: [ { model: Tag }] }
          ]
        },
        { 
          model: Collaboration,
          include: [
            { model: CollaborationRequest, include: [ { model: File }] },
            { model: CollaborationTag },
            { model: CollaborationCategory },
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
            as: "endorsementsObject",
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
          [Sequelize.literal('COALESCE("endorsementsObject"."date", "Post"."date")'), 'DESC']
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

  async getNumberPosts(userId: number) {
    const num: number = await Post.count({ where: { userId: userId, status: "Posted" } });
    return num;
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

  async deleteShowcaseTag(tag: ShowcaseTag): Promise<number> {
    try {
      const affectedRows = await ShowcaseTag.destroy(
        { where: { tagId: tag.tagId, showcaseId: tag.showcaseId } }
      );

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete ShowcaseTag!");
    }
  }

  async addTag(tag: ShowcaseTag): Promise<ShowcaseTag> {
    try {
      const newTag = await ShowcaseTag.create({...tag });
      return newTag;
    } catch (error) {
      throw new Error("Failed to create ShowcaseTag!");
    }
  }

  async deleteCollaborationSkill(tag: CollaborationTag): Promise<number> {
    try {
      const affectedRows = await CollaborationTag.destroy(
        { where: { tagId: tag.tagId, collaborationId: tag.collaborationId } }
      );

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete CollaborationTag!");
    }
  }

  async addCollaborationSkill(tag: CollaborationTag): Promise<CollaborationTag> {
    try {
      const newTag = await CollaborationTag.create({...tag });
      return newTag;
    } catch (error) {
      throw new Error("Failed to create CollaborationTag!");
    }
  }

  async saveCollaboration(collaboration: any) {
    const collab = await Collaboration.create({ ...collaboration }, { include: [{ all: true }] });
    return collab;
  };

  async updateCollaboration(collaborationId: number, fields: any): Promise<number> {
    try {
      const affectedRows = await Collaboration.update(
        { ...fields },
        { where: { id: collaborationId } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Collaboration!");
    }
  }

  async getAllCollaborationCategories() {
    const categories = await CollaborationCategory.findAll({ include: [{ model: CollaborationCategory, as: "children" }] });
    return categories;
  };
  
  async deleteCollaboration(collaboration: any) {
    await CollaborationTag.destroy({where: { collaborationId: collaboration.id } });
    await CollaborationRequest.destroy({where: { collaborationId: collaboration.id } });
    
    const collab = await Collaboration.destroy({where: { id: collaboration.id } });
    return collab;
  };

  async similarCollaborations(collaborationId: number, category: number) {
    const collabs = await Collaboration.findAll({ 
      where: { 
        collaborationCategoryId: category,
        id: { 
          [Op.notIn]: [collaborationId]
        },
      },
      include: [
      { model: Post, include: [
        { model: User, include: [ { model: Person }, { model: Company }] }
      ] }
    ],
    limit: 5,
    order: [[ "deadline", "DESC" ]] });
    return collabs;
  };

  async applyCollaboration(application: any) {
    const applicationObject = await CollaborationRequest.create({...application}, { include: [{ all: true }] });
    return applicationObject;
  };

  async getCollaborationRequest(id: number) {
    const applicationObject = await CollaborationRequest.findOne({where: { id: id }, include: [{model: User, include: [ { model: Person}, { model: Company}] }, { model: Collaboration, include: [ { model: Post, include: [ { model: User, include: [ { model: Company }, { model: Person}] }] }] }]} );
    return applicationObject;
  };

  async updateCollaborationRequest(id: number, status: string) {
    const affectedRows = await CollaborationRequest.update(
      { status },
      { where: { id: id } }
    );

    return affectedRows[0];
  };
}

export default new PostRepository()