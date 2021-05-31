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
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject/subject.service';

type SelectableEntity = ITutor | ISubject;

@Component({
  selector: 'jhi-repetition-update',
  templateUrl: './repetition-update.component.html',
})
export class RepetitionUpdateComponent implements OnInit {
  isSaving = false;
  tutors: ITutor[] = [];
  subjects: ISubject[] = [];

  editForm = this.fb.group({
    id: [],
    topic: [],
    additionalNote: [],
    dateRepetition: [null, [Validators.required]],
    nPartecipants: [null, [Validators.required]],
    duration: [null, [Validators.required]],
    price: [null, [Validators.required]],
    meetingLink: [],
    dateCreated: [],
    dateModified: [],
    dateDeleted: [],
    tutor: [],
    subject: [],
  });

  constructor(
    protected repetitionService: RepetitionService,
    protected tutorService: TutorService,
    protected subjectService: SubjectService,
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

      this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
    });
  }

  updateForm(repetition: IRepetition): void {
    this.editForm.patchValue({
      id: repetition.id,
      topic: repetition.topic,
      additionalNote: repetition.additionalNote,
      dateRepetition: repetition.dateRepetition ? repetition.dateRepetition.format(DATE_TIME_FORMAT) : null,
      nPartecipants: repetition.nPartecipants,
      duration: repetition.duration,
      price: repetition.price,
      meetingLink: repetition.meetingLink,
      dateCreated: repetition.dateCreated ? repetition.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateModified: repetition.dateModified ? repetition.dateModified.format(DATE_TIME_FORMAT) : null,
      dateDeleted: repetition.dateDeleted ? repetition.dateDeleted.format(DATE_TIME_FORMAT) : null,
      tutor: repetition.tutor,
      subject: repetition.subject,
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
      topic: this.editForm.get(['topic'])!.value,
      additionalNote: this.editForm.get(['additionalNote'])!.value,
      dateRepetition: this.editForm.get(['dateRepetition'])!.value
        ? moment(this.editForm.get(['dateRepetition'])!.value, DATE_TIME_FORMAT)
        : undefined,
      nPartecipants: this.editForm.get(['nPartecipants'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      price: this.editForm.get(['price'])!.value,
      meetingLink: this.editForm.get(['meetingLink'])!.value,
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
      subject: this.editForm.get(['subject'])!.value,
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
