import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMyRepetition, MyRepetition } from 'app/shared/model/my-repetition.model';
import { MyRepetitionService } from './my-repetition.service';

@Component({
  selector: 'jhi-my-repetition-update',
  templateUrl: './my-repetition-update.component.html',
})
export class MyRepetitionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    subject: [],
    dateRepetition: [null, [Validators.required]],
    dateCreated: [],
    dateModified: [],
    dateDeleted: [],
  });

  constructor(protected myRepetitionService: MyRepetitionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ myRepetition }) => {
      if (!myRepetition.id) {
        const today = moment().startOf('day');
        myRepetition.dateRepetition = today;
      }

      this.updateForm(myRepetition);
    });
  }

  updateForm(myRepetition: IMyRepetition): void {
    this.editForm.patchValue({
      id: myRepetition.id,
      subject: myRepetition.subject,
      dateRepetition: myRepetition.dateRepetition ? myRepetition.dateRepetition.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const myRepetition = this.createFromForm();
    if (myRepetition.id !== undefined) {
      this.subscribeToSaveResponse(this.myRepetitionService.update(myRepetition));
    } else {
      this.subscribeToSaveResponse(this.myRepetitionService.create(myRepetition));
    }
  }

  private createFromForm(): IMyRepetition {
    return {
      ...new MyRepetition(),
      id: this.editForm.get(['id'])!.value,
      subject: this.editForm.get(['subject'])!.value,
      dateRepetition: this.editForm.get(['dateRepetition'])!.value
        ? moment(this.editForm.get(['dateRepetition'])!.value, DATE_TIME_FORMAT)
        : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMyRepetition>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
