import { Moment } from 'moment';
import { ISubject } from 'app/shared/model/subject.model';

export interface IMyRepetition {
  id?: any;
  public subject?: ISubject;
  dateRepetition?: Moment;
}

export class MyRepetition implements IMyRepetition {
  constructor(
    public id?: any,
    public subject?: ISubject,
    public dateRepetition?: Moment,
  ) {}
}
