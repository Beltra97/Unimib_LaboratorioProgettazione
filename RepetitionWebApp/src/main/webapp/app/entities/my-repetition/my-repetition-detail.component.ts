import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMyRepetition } from 'app/shared/model/my-repetition.model';

@Component({
  selector: 'jhi-my-repetition-detail',
  templateUrl: './my-repetition-detail.component.html',
})
export class MyRepetitionDetailComponent implements OnInit {
  myRepetition: IMyRepetition | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ myRepetition }) => (this.myRepetition = myRepetition));
  }

  previousState(): void {
    window.history.back();
  }
}
