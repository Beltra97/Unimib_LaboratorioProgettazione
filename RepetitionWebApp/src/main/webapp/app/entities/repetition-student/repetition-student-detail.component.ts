import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepetitionStudent } from 'app/shared/model/repetition-student.model';

@Component({
  selector: 'jhi-repetition-student-detail',
  templateUrl: './repetition-student-detail.component.html',
})
export class RepetitionStudentDetailComponent implements OnInit {
  repetitionStudent: IRepetitionStudent | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ repetitionStudent }) => (this.repetitionStudent = repetitionStudent));
  }

  previousState(): void {
    window.history.back();
  }
}
