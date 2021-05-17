import { Moment } from 'moment';
import { ISubject } from 'app/shared/model/subject.model';
import { ITutor } from 'app/shared/model/tutor.model';
import { IStudent } from 'app/shared/model/student.model';

export interface IHistoryRepetition {
  id?: any;
  subject?: ISubject;
  topic?: string;
  additionalNote?: string;
  duration?: number;
  price?: number;
  dateRepetition?: Moment;
  timeRepetition?: Moment;
  students?: IStudent[];
  nPartecipants?: number;
}

export class HistoryRepetition implements IHistoryRepetition {
  constructor(
    public id?: any,
    public subject?: ISubject,
    public topic?: string,
    public additionalNote?: string,
    public duration?: number,
    public price?: number,
    public dateRepetition?: Moment,
    public timeRepetition?: Moment,
    public students?: IStudent[],
    public nPartecipants?: number) {}
}
