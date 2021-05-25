import { Moment } from 'moment';
import { ISubject } from 'app/shared/model/subject.model';
import { ITutor } from 'app/shared/model/tutor.model';

export interface IMyRepetitionStudent {
  id?: any;
  subject?: ISubject;
  topic?: string;
  additionalNote?: string;
  duration?: number;
  price?: number;
  meetingLink?: string;
  dateRepetition?: Moment;
  tutor?: ITutor;
  isFree?: boolean;
  isAlreadyBooked?: boolean;
  nPartecipants?: number;
}

export class MyRepetitionStudent implements IMyRepetitionStudent {
  constructor(
    public id?: any,
    public subject?: ISubject,
    public topic?: string,
    public additionalNote?: string,
    public duration?: number,
    public price?: number,
    public meetingLink?: string,
    public dateRepetition?: Moment,
    public tutor?: ITutor,
    public isFree?: boolean,
    public isAlreadyBooked?: boolean,
    public nPartecipants?: number
  ) {}
}
