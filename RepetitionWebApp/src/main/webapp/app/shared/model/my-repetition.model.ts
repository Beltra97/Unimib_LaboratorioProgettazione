import { Moment } from 'moment';
import { ISubject } from 'app/shared/model/subject.model';
import { IStudent } from 'app/shared/model/student.model';

export interface IMyRepetition {
  id?: any;
  subject?: ISubject;
  topic?: string;
  duration?: number,
  dateRepetition?: Moment;
  students?: IStudent[];
}

export class MyRepetition implements IMyRepetition {
  constructor(
    public id?: any,
    public subject?: ISubject,
    public topic?: string,
    public duration?: number,
    public dateRepetition?: Moment,
    public students?: IStudent[]
  ) {}
}
