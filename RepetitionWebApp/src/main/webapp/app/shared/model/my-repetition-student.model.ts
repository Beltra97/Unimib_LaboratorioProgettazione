import { Moment } from 'moment';
import { ISubject } from 'app/shared/model/subject.model';
import { ITutor } from 'app/shared/model/tutor.model';

export interface IMyRepetitionStudent {
  id?: any;
  subject?: ISubject;
  topic?: string;
  additionalNote?: string;
  duration?: number,
  dateRepetition?: Moment;
  tutor?: ITutor;
  isAlreadyBooked?: boolean;
}

export class MyRepetitionStudent implements IMyRepetitionStudent {
  constructor(
    public id?: any,
    public subject?: ISubject,
    public topic?: string,
    public additionalNote?: string,
    public duration?: number,
    public dateRepetition?: Moment,
    public tutor?: ITutor,
    public isAlreadyBooked?: boolean) {}
}
