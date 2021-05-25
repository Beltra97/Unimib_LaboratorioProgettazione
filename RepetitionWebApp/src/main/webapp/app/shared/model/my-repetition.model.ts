import { Moment } from 'moment';
import { ISubject } from 'app/shared/model/subject.model';
import { IStudent } from 'app/shared/model/student.model';

export interface IMyRepetition {
  id?: any;
  subject?: ISubject;
  topic?: string;
  additionalNote?: string;
  duration?: number;
  price?: number;
  meetingLink?: string;
  dateRepetition?: Moment;
  timeRepetition?: Moment;
  students?: IStudent[];
  nPartecipants?: number;
}

export class MyRepetition implements IMyRepetition {
  constructor(
    public id?: any,
    public subject?: ISubject,
    public topic?: string,
    public additionalNote?: string,
    public duration?: number,
    public price?: number,
    public meetingLink?: string,
    public dateRepetition?: Moment,
    public timeRepetition?: Moment,
    public students?: IStudent[],
    public nPartecipants?: number
  ) {}
}
