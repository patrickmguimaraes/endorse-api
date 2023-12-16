import AuthValidation from "./auth.validation";
import FollowerValidation from "./follower.validation";
import PostValidation from "./post.validation";

export const authValidation = new AuthValidation();
export const postValidation = new PostValidation();
export const followerValidation = new FollowerValidation();