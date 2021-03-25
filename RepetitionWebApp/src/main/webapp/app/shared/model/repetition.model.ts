import { Moment } from 'moment';
import { ITutor } from 'app/shared/model/tutor.model';

export interface IRepetition {
  id?: number;
  subject?: string;
  dateRepetition?: Moment;
  dateCreated?: Moment;
  dateModified?: Moment;
  dateDeleted?: Moment;
  tutor?: ITutor;
}

export class Repetition implements IRepetition {
  constructor(
    public id?: number,
    public subject?: string,
    public dateRepetition?: Moment,
    public dateCreated?: Moment,
    public dateModified?: Moment,
    public dateDeleted?: Moment,
    public tutor?: ITutor
  ) {}
}
