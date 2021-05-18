import { Moment } from 'moment';
import { ISubject } from 'app/shared/model/subject.model';
import { ITutor } from 'app/shared/model/tutor.model';

export interface IHistoryRepetitionStudent {
  id?: any;
  subject?: ISubject;
  topic?: string;
  additionalNote?: string;
  duration?: number,
  price?: number;
  dateRepetition?: Moment;
  tutor?: ITutor;
  isFree?: boolean;
  isAlreadyBooked?: boolean;
}

export class HistoryRepetitionStudent implements IHistoryRepetitionStudent {
  constructor(
    public id?: any,
    public subject?: ISubject,
    public topic?: string,
    public additionalNote?: string,
    public duration?: number,
    public price?: number,
    public dateRepetition?: Moment,
    public tutor?: ITutor,
    public isFree?: boolean,
    public isAlreadyBooked?: boolean) {}
}
