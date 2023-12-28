import httpStatus from 'http-status';
import { catchAsync } from '../utils/catchAsync';
import postRepository from '../repositories/post.repository';
import Showcase from '../models/showcase.model';
import ApiError from '../utils/ApiError';
import fileRepository from '../repositories/file.repository';
import followerRepository from '../repositories/follower.repository';
import emailRepository from '../repositories/email.repository';

export default class PostController {
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

  getNumbersPosts = catchAsync(async (req: any, res: any) => {
    const numIdeas = await postRepository.getNumberPosts(req.body.userId);
    const followers = await followerRepository.followingNumber(req.body.userId, req.body.userId)

    res.status(httpStatus.OK).send({ideas: numIdeas, followers: followers.followers, followeds: followers.followeds});
  }); 

  showcase = catchAsync(async (req: any, res: any) => {
    const showcase = req.body;
    const post = await postRepository.getPostById(showcase.postId);

    if(!post || post.userId!=req.user.id) {
      throw new ApiError(httpStatus.LOCKED, 'The post you want to update is from another user!');
    }

    if(!showcase.id) {
      const show = await postRepository.saveShowcase(showcase);
      res.status(httpStatus.CREATED).send(show);
    }
    else {
      const show = await postRepository.updateShowcase(showcase.id, showcase);
      res.status(httpStatus.OK).send(showcase);
    }
  }); 

  deleteShowcaseTag = catchAsync(async (req: any, res: any) => {
    const num = await postRepository.deleteShowcaseTag(req.body.tag);
    res.status(httpStatus.OK).send(num>0);
  }); 

  addTag = catchAsync(async (req: any, res: any) => {
    const tag = await postRepository.addTag(req.body.tag);
    res.status(httpStatus.OK).send(tag);
  }); 

  deleteCollaborationSkill = catchAsync(async (req: any, res: any) => {
    const num = await postRepository.deleteCollaborationSkill(req.body.tag);
    res.status(httpStatus.OK).send(num>0);
  }); 

  addCollaborationSkill = catchAsync(async (req: any, res: any) => {
    const tag = await postRepository.addCollaborationSkill(req.body.tag);
    res.status(httpStatus.OK).send(tag);
  }); 

  collaboration = catchAsync(async (req: any, res: any) => {
    const collaboration = req.body;
    const post = await postRepository.getPostById(collaboration.postId);

    if(!post || post.userId!=req.user.id) {
      throw new ApiError(httpStatus.LOCKED, 'The post you want to update is from another user!');
    }

    if(!collaboration.id) {
      const collab = await postRepository.saveCollaboration(collaboration);
      res.status(httpStatus.CREATED).send(collab);
    }
    else {
      const collab = await postRepository.updateCollaboration(collaboration.id, collaboration);
      res.status(httpStatus.OK).send(collaboration);
    }
  }); 

  deleteCollaboration = catchAsync(async (req: any, res: any) => {
    const collaboration = req.body.collaboration;
    const post = await postRepository.getPostById(collaboration.postId);

    if(!post || post.userId!=req.user.id) {
      throw new ApiError(httpStatus.LOCKED, 'The collaboration you want to delete is from another user!');
    }

    const collab = await postRepository.deleteCollaboration(collaboration);
    res.status(httpStatus.OK).send(collab>0);
  }); 


  getAllCollaborationCategories = catchAsync(async (req: any, res: any) => {
    const categories = await postRepository.getAllCollaborationCategories();
    res.status(httpStatus.OK).send(categories);
  }); 

  similarCollaborations = catchAsync(async (req: any, res: any) => {
    const collaborations = await postRepository.similarCollaborations(req.body.collaborationId, req.body.category);
    res.status(httpStatus.OK).send(collaborations);
  }); 

  applyCollaboration = catchAsync(async (req: any, res: any) => {
    if(req.body.application.userId!=req.user.id) {
      throw new ApiError(httpStatus.LOCKED, 'You can not apply for another person!');
    }

    const application = await postRepository.applyCollaboration(req.body.application);
    res.status(httpStatus.OK).send(application);
  }); 

  changeCollaborationRequestStatus = catchAsync(async (req: any, res: any) => {
    const collab = await postRepository.getCollaborationRequest(req.body.collaborationRequestId);
    
    if(collab?.collaboration?.post?.userId!=req.user.id) {
      throw new ApiError(httpStatus.LOCKED, 'You can not change the status for another person!');
    }

    const application = await postRepository.updateCollaborationRequest(req.body.collaborationRequestId, req.body.status);
    
    var name = collab?.collaboration?.post?.user?.type=="Person" ? collab?.collaboration?.post?.user.person?.name + " " + collab?.collaboration?.post?.user.person?.surname : collab?.collaboration?.post?.user?.company?.name;
    if(req.body.status=="Approved") { await emailRepository.sendCollaborationApprovedEmail(name!, collab?.user?.email!); }
    else { await emailRepository.sendCollaborationReprovedEmail(name!, collab?.user?.email!); }
    
    res.status(httpStatus.OK).send(application>0);
  }); 
}