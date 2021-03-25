import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRepetition, Repetition } from 'app/shared/model/repetition.model';
import { RepetitionService } from './repetition.service';
import { ITutor } from 'app/shared/model/tutor.model';
import { TutorService } from 'app/entities/tutor/tutor.service';

@Component({
  selector: 'jhi-repetition-update',
  templateUrl: './repetition-update.component.html',
})
export class RepetitionUpdateComponent implements OnInit {
  isSaving = false;
  tutors: ITutor[] = [];

  editForm = this.fb.group({
    id: [],
    subject: [],
    dateRepetition: [null, [Validators.required]],
    dateCreated: [],
    dateModified: [],
    dateDeleted: [],
    tutor: [],
  });

  constructor(
    protected repetitionService: RepetitionService,
    protected tutorService: TutorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ repetition }) => {
      if (!repetition.id) {
        const today = moment().startOf('day');
        repetition.dateRepetition = today;
        repetition.dateCreated = today;
        repetition.dateModified = today;
        repetition.dateDeleted = today;
      }

      this.updateForm(repetition);

      this.tutorService.query().subscribe((res: HttpResponse<ITutor[]>) => (this.tutors = res.body || []));
    });
  }

  updateForm(repetition: IRepetition): void {
    this.editForm.patchValue({
      id: repetition.id,
      subject: repetition.subject,
      dateRepetition: repetition.dateRepetition ? repetition.dateRepetition.format(DATE_TIME_FORMAT) : null,
      dateCreated: repetition.dateCreated ? repetition.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateModified: repetition.dateModified ? repetition.dateModified.format(DATE_TIME_FORMAT) : null,
      dateDeleted: repetition.dateDeleted ? repetition.dateDeleted.format(DATE_TIME_FORMAT) : null,
      tutor: repetition.tutor,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const repetition = this.createFromForm();
    if (repetition.id !== undefined) {
      this.subscribeToSaveResponse(this.repetitionService.update(repetition));
    } else {
      this.subscribeToSaveResponse(this.repetitionService.create(repetition));
    }
  }

  private createFromForm(): IRepetition {
    return {
      ...new Repetition(),
      id: this.editForm.get(['id'])!.value,
      subject: this.editForm.get(['subject'])!.value,
      dateRepetition: this.editForm.get(['dateRepetition'])!.value
        ? moment(this.editForm.get(['dateRepetition'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateCreated: this.editForm.get(['dateCreated'])!.value
        ? moment(this.editForm.get(['dateCreated'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateModified: this.editForm.get(['dateModified'])!.value
        ? moment(this.editForm.get(['dateModified'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateDeleted: this.editForm.get(['dateDeleted'])!.value
        ? moment(this.editForm.get(['dateDeleted'])!.value, DATE_TIME_FORMAT)
        : undefined,
      tutor: this.editForm.get(['tutor'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepetition>>): void {
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

  trackById(index: number, item: ITutor): any {
    return item.id;
  }
}
