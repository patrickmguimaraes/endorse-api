import AuthValidation from "./auth.validation";
import FollowerValidation from "./follower.validation";
import PostValidation from "./post.validation";
import TagValidation from "./tag.validation";
import UserValidation from "./user.validation";

export const authValidation = new AuthValidation();
export const postValidation = new PostValidation();
export const followerValidation = new FollowerValidation();
export const userValidation = new UserValidation();
export const tagValidation = new TagValidation();