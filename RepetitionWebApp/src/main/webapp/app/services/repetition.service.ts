import { Injectable } from '@angular/core';

import { Repetition } from '../shared/repetition/repetition';
import { REPETITIONS } from '../shared/repetition/repetitions';

@Injectable({
  providedIn: 'root',
})
export class RepetitionService {
  constructor() {}

  getRepetitions(): Repetition[] {
    return REPETITIONS;
  }

  getRepetition(id: string): Repetition {
    return REPETITIONS.filter(repetition => repetition.id === id)[0];
  }
}
