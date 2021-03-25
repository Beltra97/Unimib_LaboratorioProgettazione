import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IStudent {
  id?: number;
  name?: string;
  surname?: string;
  birthDate?: Moment;
  dateCreated?: Moment;
  dateModified?: Moment;
  dateDeleted?: Moment;
  user?: IUser;
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public birthDate?: Moment,
    public dateCreated?: Moment,
    public dateModified?: Moment,
    public dateDeleted?: Moment,
    public user?: IUser
  ) {}
}
