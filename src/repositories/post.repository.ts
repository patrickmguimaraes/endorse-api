import httpStatus from 'http-status';
import Token from '../models/token.model';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import Post from '../models/post.model';
import Follower from '../models/follower.model';
import { Op } from 'sequelize';
import View from '../models/view.model';
import Person from '../models/person.model';
import Company from '../models/company.model';
import Article from '../models/article.model';
import Idea from '../models/idea.model';
import File from '../models/file.model';
import Power from '../models/power.model';

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

  async newsFeed(userId: number, page: number = 1, pageSize: number = 10) {
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

      const newsFeed = await Post.findAndCountAll({
        where: {
          userId: {
            [Op.or]: [userId, ...followingIds],
          },
          status: 'Posted',
          id: {
            [Op.notIn]:  [...viewsIds]
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
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
  
      return newsFeed;
    } catch (error) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'An error ocurred while getting your news feed. Try later.');
    }
  };

  async viewed(userId: number, postId: number) {
    const result = await View.create({userId: userId, postId: postId});
    return result;
  };

  async power(userId: number, postId: number) {
    const result = await Power.create({userId: userId, postId: postId});

    const post = await Post.findOne({where: { id: postId}});
    await Post.update(
      { powers: post?.powers! + 1 },
      { where: { id: post?.id } }
    );

    return {power: result, powers: post?.powers! + 1};
  };

  async unpower(userId: number, postId: number) {
    const result = await Power.findOne({where: {userId, postId}});

    const post = await Post.findOne({where: { id: postId}});
    await Post.update(
      { powers: post?.powers! - 1 },
      { where: { id: post?.id } }
    );

    result?.destroy();

    return {unpower: result, powers: post?.powers! - 1};
  };
}

export default new PostRepository()