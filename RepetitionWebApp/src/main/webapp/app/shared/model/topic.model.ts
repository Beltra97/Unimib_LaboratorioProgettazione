import { Moment } from 'moment';
import { ISubject } from 'app/shared/model/subject.model';

export interface ITopic {
  id?: number;
  name?: string;
  description?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  dateDeleted?: Moment;
  subject?: ISubject;
}

export class Topic implements ITopic {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public dateCreated?: Moment,
    public dateModified?: Moment,
    public dateDeleted?: Moment,
    public subject?: ISubject
  ) {}
}
