import httpStatus from 'http-status';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import Follower from '../models/follower.model';
import { Op, Sequelize } from 'sequelize';
import Person from '../models/person.model';
import Company from '../models/company.model';

class FollowerRepository {
  async follow(follower: Follower) {

    const result = await Follower.create({...follower});

    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error ocurred while following. Try later.');
    }

    return result;
  };

  async unfollow(follower: Follower) {

    const result = await Follower.destroy({ where: { followedId: follower.followedId, followerId: follower.followerId } });

    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error ocurred while unfollowing. Try later.');
    }

    return result>0;
  };

  async suggests(userId: number, limit: number = 5) {
    try {
      const currentFollowings = await Follower.findAll({
        where: { followerId: userId },
        attributes: ['followedId'],
      });
  
      const currentFollowingIds = currentFollowings.map((user) => user.followedId);
  
      const suggestedFollowers = await User.findAll({
        where: {
          id: {
            [Op.notIn]: [userId, ...currentFollowingIds],
          },
          status: 'Active'
        },
        include: [{ model: Person, as: 'person' }, { model: Company, as: 'company' }],
        limit: limit,
        order: Sequelize.literal('rand()'),
      });
  
      return suggestedFollowers;
    } catch (error) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'An error ocurred while getting your news feed. Try later.');
    }
  }

  async isFollowing(followerId: number, followedId: number) {
    try {
      const follower = await Follower.findOne({
        where: { followerId: followerId, followedId: followedId }
      });
  
      return follower;
    } catch (error) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'An error ocurred while getting the follower. Try later.');
    }
  }

  async followingNumber(followerId: number, followedId: number) {
    try {
      const followers = await Follower.count({
        where: { followerId: followerId }
      });
  
      const followeds = await Follower.count({
        where: { followedId: followedId }
      });

      return {followers, followeds};
    } catch (error) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'An error ocurred while counting the follower. Try later.');
    }
  }
}

export default new FollowerRepository()