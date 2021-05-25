import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepetition } from 'app/shared/model/repetition.model';

@Component({
  selector: 'jhi-repetition-detail',
  templateUrl: './repetition-detail.component.html',
})
export class RepetitionDetailComponent implements OnInit {
  repetition: IRepetition | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ repetition }) => (this.repetition = repetition));
  }

  previousState(): void {
    window.history.back();
  }
}
