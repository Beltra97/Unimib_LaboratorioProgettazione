import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IRepetition } from 'app/shared/model/repetition.model';
import { ISubject } from 'app/shared/model/subject.model';

export interface ITutor {
  id?: number;
  name?: string;
  surname?: string;
  birthDate?: Moment;
  degree?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  dateDeleted?: Moment;
  user?: IUser;
  repetitions?: IRepetition[];
  subjects?: ISubject[];
}

export class Tutor implements ITutor {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public birthDate?: Moment,
    public degree?: string,
    public dateCreated?: Moment,
    public dateModified?: Moment,
    public dateDeleted?: Moment,
    public user?: IUser,
    public repetitions?: IRepetition[],
    public subjects?: ISubject[]
  ) {}
}
