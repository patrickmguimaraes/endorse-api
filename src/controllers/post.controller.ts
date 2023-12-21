import httpStatus from 'http-status';
import { catchAsync } from '../utils/catchAsync';
import postRepository from '../repositories/post.repository';

export default class AuthController {
  post = catchAsync(async (req: any, res: any) => {
    const post = await postRepository.post(req.body);
    res.status(httpStatus.CREATED).send(post);
  }); 

  newsFeed = catchAsync(async (req: any, res: any) => {
    const neewsFeed = await postRepository.newsFeed(req.body.userId);
    res.status(httpStatus.OK).send(neewsFeed);
  }); 

  viewed = catchAsync(async (req: any, res: any) => {
    const viewed = await postRepository.viewed(req.body.userId, req.body.postId);
    res.status(httpStatus.OK).send(viewed);
  }); 

  power = catchAsync(async (req: any, res: any) => {
    const powered = await postRepository.power(req.body.userId, req.body.postId);
    res.status(httpStatus.OK).send(powered);
  }); 

  unpower = catchAsync(async (req: any, res: any) => {
    const unpowered = await postRepository.unpower(req.body.userId, req.body.postId);
    res.status(httpStatus.OK).send(unpowered);
  }); 

  endorse = catchAsync(async (req: any, res: any) => {
    const endorsed = await postRepository.endorse(req.body);
    res.status(httpStatus.OK).send(endorsed);
  }); 

  poweredAndEndorsed = catchAsync(async (req: any, res: any) => {
    const poweredAndEndorsed = await postRepository.poweredAndEndorsed(req.body.userId, req.body.postId);
    res.status(httpStatus.OK).send(poweredAndEndorsed);
  }); 
}