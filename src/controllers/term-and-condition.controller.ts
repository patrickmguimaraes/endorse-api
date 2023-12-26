import { catchAsync } from '../utils/catchAsync';
import termAndConditionRepository from '../repositories/term-and-condition.repository';

export default class TermAndConditionController {
  getAll = catchAsync(async (req: any, res: any) => {
    var all = await termAndConditionRepository.getAll();
    res.send(all);
  });
}