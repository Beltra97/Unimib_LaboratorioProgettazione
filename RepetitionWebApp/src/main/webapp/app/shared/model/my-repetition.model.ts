import { Moment } from 'moment';

export interface IMyRepetition {
  id?: number;
  subject?: string;
  dateRepetition?: Moment;
}

export class MyRepetition implements IMyRepetition {
  constructor(
    public id?: number,
    public subject?: string,
    public dateRepetition?: Moment,
  ) {}
}
