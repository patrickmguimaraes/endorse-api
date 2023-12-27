import httpStatus from 'http-status';
import { catchAsync } from '../utils/catchAsync';
import tagRepository from '../repositories/tag.repository';

export default class TagController {
  findOrCreate = catchAsync(async (req: any, res: any) => {
    const tag = await tagRepository.findOrCreate(req.body.tag);
    res.status(httpStatus.OK).send(tag);
  }); 
}