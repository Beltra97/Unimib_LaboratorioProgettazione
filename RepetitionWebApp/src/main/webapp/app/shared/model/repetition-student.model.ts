import { Moment } from 'moment';
import { IRepetition } from 'app/shared/model/repetition.model';
import { IStudent } from 'app/shared/model/student.model';

export interface IRepetitionStudent {
  id?: number;
  dateCreated?: Moment;
  dateModified?: Moment;
  dateDeleted?: Moment;
  repetition?: IRepetition;
  student?: IStudent;
  meetingLink?: string;
}

export class RepetitionStudent implements IRepetitionStudent {
  constructor(
    public id?: number,
    public dateCreated?: Moment,
    public dateModified?: Moment,
    public dateDeleted?: Moment,
    public repetition?: IRepetition,
    public student?: IStudent,
    public meetingLink?: string
  ) {}
}
