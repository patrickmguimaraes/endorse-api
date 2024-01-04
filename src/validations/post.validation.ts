import Joi from 'joi';

export default class PostValidation {
  getPost = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      code: Joi.string().required()
    }),
  }

  post = {
    body: Joi.object().keys({
      date: Joi.date().required(),
      powers: Joi.number().required(),
      endorsements: Joi.number().required(),
      user: Joi.object(),
      userId: Joi.number().required(),
      powersObject: Joi.array().allow(null),
      endorsementsObject: Joi.array().allow(null),
      link: Joi.string().allow(null),
      status: Joi.string().required(),
      views: Joi.array().allow(null),
      collaborations: Joi.array().allow(null),
      files: Joi.array().allow(null),
      article: Joi.object().allow(null),
      idea: Joi.object().allow(null),
      requestCopyrights: Joi.array().allow(null),
    }),
  };

  newsFeed = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      page: Joi.number().required(),
      feedOnlyThisUser: Joi.boolean().required()
    }),
  };

  viewed = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
      endorseId: Joi.number().allow(null)
    }),
  }

  power = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
    }),
  }

  unpower = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
    }),
  }

  endorse = {
    body: Joi.object().keys({
      text: Joi.string(),
      date: Joi.date().required(),
      status: Joi.string().required(),
      postId: Joi.number().required(),
      userId: Joi.number().required(),
      fatherId: Joi.number().allow(null),
      post: Joi.object(),
      user: Joi.object(),
      father: Joi.object(),
      children: Joi.array()
    }),
  }

  poweredAndEndorsed = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
    }),
  }

  getPostName = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
    }),
  }

  getNumbersPosts = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
    }),
  }

  showcase = {
    body: Joi.object().keys({
      id: Joi.number(),
      title: Joi.string().allow(null).allow(""),
      description: Joi.string().allow(null).allow(""),
      implementationPlan: Joi.string().allow(null).allow(""),
      challenges: Joi.string().allow(null).allow(""),
      postId: Joi.number().required(),
      categoryId: Joi.number().allow(null),
      tags: Joi.array(),
      files: Joi.array(),
      category: Joi.object().allow(null)
    }),
  }

  deleteShowcaseTag = {
    body: Joi.object().keys({
      tag: Joi.object().required(),
    }),
  }

  addTag = {
    body: Joi.object().keys({
      tag: Joi.object().required(),
    }),
  }

  addCollaborationSkill = {
    body: Joi.object().keys({
      tag: Joi.object().required(),
    }),
  }

  deleteCollaborationSkill = {
    body: Joi.object().keys({
      tag: Joi.object().required(),
    }),
  }

  collaboration = {
    body: Joi.object().keys({
      id: Joi.number(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      workingExperience: Joi.string().required(),
      vacacies: Joi.number().required(),
      salary: Joi.string().required(),
      deadline: Joi.date().required(),
      post: Joi.object(),
      postId: Joi.number().required(),
      collaborationCategoryId: Joi.number().required(),
      skills: Joi.array(),
      requests: Joi.array(),
      collaborationCategory: Joi.object().allow(null)
    }),
  }

  deleteCollaboration = {
    body: Joi.object().keys({
      collaboration: Joi.object().required(),
    }),
  }

  similarCollaborations = {
    body: Joi.object().keys({
      collaborationId: Joi.number().required(),
      category: Joi.number().required(),
    }),
  }

  applyCollaboration = {
    body: Joi.object().keys({
      application: Joi.object().required(),
    }),
  }

  changeCollaborationRequestStatus = {
    body: Joi.object().keys({
      collaborationRequestId: Joi.number().required(),
      status: Joi.string().required()
    }),
  }
}