import { Moment } from 'moment';
import { IRepetition } from 'app/shared/model/repetition.model';
import { ITopic } from 'app/shared/model/topic.model';
import { ITutor } from 'app/shared/model/tutor.model';

export interface ISubject {
  id?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  dateDeleted?: Moment;
  repetitions?: IRepetition[];
  topics?: ITopic[];
  tutors?: ITutor[];
}

export class Subject implements ISubject {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public imageUrl?: string,
    public dateCreated?: Moment,
    public dateModified?: Moment,
    public dateDeleted?: Moment,
    public repetitions?: IRepetition[],
    public topics?: ITopic[],
    public tutors?: ITutor[]
  ) {}
}
