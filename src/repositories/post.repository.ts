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

class PostRepository {
  async post(post: Post) {

    const result = await Post.create({...post}, {include:[{ all: true }]});

    result.link = new Date().valueOf().toString(36);

    await Post.update(
      { link: result.link },
      { where: { id: result.id } }
    );

    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error ocurred while saving your post. Try later.');
    }

    return result;
  };

  async newsFeed(userId: number) {
    try {
      const following = await Follower.findAll({
        where: { followerId: userId },
        attributes: ['followedId'],
      });
  
      const followingIds = following.map((user) => user.followedId);

      const views = await View.findAll({
        where: { userId },
        attributes: ['postId'],
      });

      const viewsIds = views.map((view) => view.postId);

      const endorsements = await Endorse.findAndCountAll({
        where: {
          userId: {
            [Op.or]: [...followingIds]
          },
          status: 'Posted',
          postId: {
            [Op.notIn]:  [...viewsIds]
          },
        },
        include: [
          {
            model: Post, as: 'post', include: [
              {
                model: User,
                include: [{ model: Person, as: 'person' }, { model: Company, as: 'company'}]
              },
              { model: Article, as: 'article' },
              { model: Idea, as: 'idea' },
              { model: File, as: 'files' }
            ]
          },
          {
            model: User,
            include: [{ model: Person, as: 'person' }, { model: Company, as: 'company'}]
          },
        ],
        order: [['date', 'DESC']],
        limit: 5,
      });

      const postsAlredyColectedIds = endorsements.rows.map((endorse) => endorse.postId);

      const posts = await Post.findAndCountAll({
        where: {
          userId: {
            [Op.or]: [userId, ...followingIds]
          },
          status: 'Posted',
          id: {
            [Op.notIn]:  [...viewsIds, ...postsAlredyColectedIds]
          },
        },
        include: [
          {
            model: User,
            include: [{ model: Person, as: 'person' }, { model: Company, as: 'company'}]
          },
          { model: Article, as: 'article' },
          { model: Idea, as: 'idea' },
          { model: File, as: 'files' }
        ],
        order: [['date', 'DESC']],
        limit: 5
      });

      return { endorsements, posts };
    } catch (error: any) {
      console.log(error.message)
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'An error ocurred while getting your news feed. Try later.');
    }
  };

  async viewed(userId: number, postId: number) {
    const [view, created] = await View.findOrCreate({
      where: {userId: userId, postId: postId}
    });

    if(created) {
      return view;
    }
    else {
      return null;
    }
  };

  async power(userId: number, postId: number) {
    const check = await Power.findOne({where: {userId: userId, postId: postId}});
    const post = await Post.findOne({where: { id: postId}});

    if(!check) {
      const result = await Power.create({userId: userId, postId: postId});

      await Post.update(
        { powers: post?.powers! + 1 },
        { where: { id: post?.id } }
      );
  
      return {power: result, powers: post?.powers! + 1};
    }
    else {
      return {power: check, powers: post?.powers!};
    }
  };

  async unpower(userId: number, postId: number) {
    const result = await Power.findOne({where: {userId, postId}});
    const post = await Post.findOne({where: { id: postId}});

    if(result) {
      await Post.update(
        { powers: post?.powers! - 1 },
        { where: { id: post?.id } }
      );
  
      result?.destroy();
  
      return {unpower: result, powers: post?.powers! - 1};
    }
    else {
      return {unpower: result, powers: post?.powers!};
    }
  };

  async endorse(endorse: Endorse) {
    const result = await Endorse.create({...endorse});
    return result
  };

  async poweredAndEndorsed(userId: number, postId: number) {
    const power = await Power.findOne({where: {userId: userId, postId: postId}});
    const endorse = await Endorse.findOne({where: {userId: userId, postId: postId}});

    return {power: power, endorse: endorse}
  };
}

export default new PostRepository()