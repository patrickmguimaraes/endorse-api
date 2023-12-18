import httpStatus from 'http-status';
import { catchAsync } from '../utils/catchAsync';
import followerRepository from '../repositories/follower.repository';

export default class FollowerController {
  follow = catchAsync(async (req: any, res: any) => {
    const follow = await followerRepository.follow(req.body);
    res.status(httpStatus.CREATED).send(follow);
  });
  
  unfollow = catchAsync(async (req: any, res: any) => {
    const wasFollowed = await followerRepository.unfollow(req.body);
    res.status(httpStatus.OK).send(wasFollowed);
  });

  suggests = catchAsync(async (req: any, res: any) => {
    const suggests = await followerRepository.suggests(req.body.userId, req.body.limit);
    res.status(httpStatus.OK).send(suggests);
  }); 
}