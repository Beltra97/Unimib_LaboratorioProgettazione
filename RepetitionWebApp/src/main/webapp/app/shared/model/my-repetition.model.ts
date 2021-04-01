import { Moment } from 'moment';
import { ISubject } from 'app/shared/model/subject.model';

export interface IMyRepetition {
  id?: any;
  subject?: ISubject;
  topic?: string;
  dateRepetition?: Moment;
}

export class MyRepetition implements IMyRepetition {
  constructor(
    public id?: any,
    public subject?: ISubject,
    public topic?: string,
    public dateRepetition?: Moment,
  ) {}
}
