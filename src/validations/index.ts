import AddressValidation from "./address.validation";
import AuthValidation from "./auth.validation";
import CompanyValidation from "./company.validation";
import FollowerValidation from "./follower.validation";
import NotificationValidation from "./notification.validation";
import PostValidation from "./post.validation";
import TagValidation from "./tag.validation";
import UserValidation from "./user.validation";

export const authValidation = new AuthValidation();
export const postValidation = new PostValidation();
export const followerValidation = new FollowerValidation();
export const userValidation = new UserValidation();
export const tagValidation = new TagValidation();
export const notificationValidation = new NotificationValidation();
export const companyValidation = new CompanyValidation();
export const addressValidation = new AddressValidation();