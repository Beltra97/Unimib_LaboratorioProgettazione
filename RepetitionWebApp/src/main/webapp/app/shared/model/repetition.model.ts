import { Moment } from 'moment';
import { ITutor } from 'app/shared/model/tutor.model';
import { ISubject } from 'app/shared/model/subject.model';

export interface IRepetition {
  id?: number;
  topic?: string;
  additionalNote?: string;
  dateRepetition?: Moment;
  duration?: number;
  dateCreated?: Moment;
  dateModified?: Moment;
  dateDeleted?: Moment;
  tutor?: ITutor;
  subject?: ISubject;
}

export class Repetition implements IRepetition {
  constructor(
    public id?: number,
    public topic?: string,
    public additionalNote?: string,
    public dateRepetition?: Moment,
    public duration?: number,
    public dateCreated?: Moment,
    public dateModified?: Moment,
    public dateDeleted?: Moment,
    public tutor?: ITutor,
    public subject?: ISubject
  ) {}
}
