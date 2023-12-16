import httpStatus from 'http-status';
import Token from '../models/token.model';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import Post from '../models/post.model';
import Follower from '../models/follower.model';
import { Op } from 'sequelize';
import View from '../models/view.model';

class PostRepository {
  async post(post: Post) {

    const result = await Post.create({...post}, {include:[{ all: true }]});

    result.link = new Date().valueOf().toString(36);

    console.log(result.link);

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

      const newsFeed = await Post.findAndCountAll({
        where: {
          userId: {
            [Op.or]: [userId, ...followingIds],
          },
          status: 'Posted',
          id: {
            [Op.notIn]: await View.findAll({
              where: { userId },
              attributes: ['postId'],
            }),
          },
        },
        include: [
          {
            model: User,
            attributes: ['id', 'username'], 
          },
        ],
        order: [['createdAt', 'DESC']],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
  
      return newsFeed;
    } catch (error) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'An error ocurred while getting your news feed. Try later.');
    }
  };
}

export default new PostRepository()