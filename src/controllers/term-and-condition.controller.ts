import { catchAsync } from '../utils/catchAsync';
import termAndConditionRepository from '../repositories/term-and-condition.repository';

export default class TermAndConditionController {
  getLast = catchAsync(async (req: any, res: any) => {
    var last = await termAndConditionRepository.getLast();
    res.send(last);
  });
}