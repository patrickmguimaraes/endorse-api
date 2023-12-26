import httpStatus from 'http-status';
import { catchAsync } from '../utils/catchAsync';
import postRepository from '../repositories/post.repository';
import Showcase from '../models/showcase.model';
import ApiError from '../utils/ApiError';
import fileRepository from '../repositories/file.repository';

export default class AuthController {
  getPost = catchAsync(async (req: any, res: any) => {
    const post = await postRepository.getPost(req.body.userId, req.body.code);
    res.status(httpStatus.OK).send(post);
  }); 

  post = catchAsync(async (req: any, res: any) => {
    const post = await postRepository.post(req.body);

    req.body.files?.forEach(async (file: any) => {
      await fileRepository.moveLocationPost(file.path!, req.user.id, post.id!);
    })
    
    res.status(httpStatus.CREATED).send(post);
  }); 

  newsFeed = catchAsync(async (req: any, res: any) => {
    const neewsFeed = await postRepository.newsFeed(req.body.userId, req.user.id, req.body.page, req.body.feedOnlyThisUser);
    res.status(httpStatus.OK).send(neewsFeed);
  }); 

  viewed = catchAsync(async (req: any, res: any) => {
    const viewed = await postRepository.viewed(req.body.userId, req.body.postId, req.body.endorseId);
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

  getPostName = catchAsync(async (req: any, res: any) => {
    const poweredAndEndorsed = await postRepository.getPostName(req.body.userId);
    res.status(httpStatus.OK).send(poweredAndEndorsed);
  }); 

  showcase = catchAsync(async (req: any, res: any) => {
    const showcase = req.body;
    const post = await postRepository.getPostById(showcase.postId);

    if(!post || post.userId!=req.user.id) {
      throw new ApiError(httpStatus.LOCKED, 'The post you want to update is from another user!');
    }

    var show;

    if(!showcase.id) {
      show = await postRepository.saveShowcase(showcase);
      res.status(httpStatus.CREATED).send(show);
    }
    else {
      show = await postRepository.updateShowcase(showcase.id, showcase);
      res.status(httpStatus.OK).send(showcase);
    }
  }); 
}