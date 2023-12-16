import httpStatus from 'http-status';
import { catchAsync } from '../utils/catchAsync';
import postRepository from '../repositories/post.repository';

export default class AuthController {
  post = catchAsync(async (req: any, res: any) => {
    const post = await postRepository.post(req.body);
    res.status(httpStatus.CREATED).send(post);
  }); 

  newsFeed = catchAsync(async (req: any, res: any) => {
    const neewsFeed = await postRepository.newsFeed(req.body.userId, req.body.page, req.body.pageSize);
    res.status(httpStatus.OK).send(neewsFeed);
  }); 
}