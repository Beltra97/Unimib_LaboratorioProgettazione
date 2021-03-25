import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IRepetition } from 'app/shared/model/repetition.model';

export interface ITutor {
  id?: number;
  name?: string;
  surname?: string;
  birthDate?: Moment;
  subject?: string;
  degree?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  dateDeleted?: Moment;
  user?: IUser;
  repetitions?: IRepetition[];
}

export class Tutor implements ITutor {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public birthDate?: Moment,
    public subject?: string,
    public degree?: string,
    public dateCreated?: Moment,
    public dateModified?: Moment,
    public dateDeleted?: Moment,
    public user?: IUser,
    public repetitions?: IRepetition[]
  ) {}
}
