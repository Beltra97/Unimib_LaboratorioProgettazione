import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMyRepetition, MyRepetition } from 'app/shared/model/my-repetition.model';
import { MyRepetitionService } from './my-repetition.service';

import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject/subject.service';

type SelectableEntity = ISubject;

@Component({
  selector: 'jhi-my-repetition-update',
  templateUrl: './my-repetition-update.component.html',
})
export class MyRepetitionUpdateComponent implements OnInit {
  isSaving = false;
  subjects: ISubject[] = [];

  minDate = new Date().toJSON().split('T')[0];

  editForm = this.fb.group({
    id: [],
    subject: ['', [Validators.required]],
    duration: [null, [Validators.required, Validators.min(30), Validators.max(250)]],
    price: [null, [Validators.required, Validators.min(5), Validators.max(50)]],
    dateRepetition: [null, [Validators.required]],
    timeRepetition: [null, [Validators.required]],
    dateCreated: [],
    dateModified: [],
    dateDeleted: [],
  });

  constructor(
    protected myRepetitionService: MyRepetitionService,
    protected subjectService: SubjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ myRepetition }) => {
      if (!myRepetition.id) {
        const today = moment().add(1, 'days').startOf('day');
        myRepetition.dateRepetition = today;
      }

      this.updateForm(myRepetition);

      this.subjectService.queryMySubjects().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
    });
  }

  updateForm(myRepetition: IMyRepetition): void {
    this.editForm.patchValue({
      id: myRepetition.id,
      subject: myRepetition.subject,
      duration: myRepetition.duration,
      price: myRepetition.price,
      dateRepetition: myRepetition.dateRepetition ? myRepetition.dateRepetition.format(DATE_FORMAT) : null,
      timeRepetition: myRepetition.dateRepetition ? myRepetition.dateRepetition.format(TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const myRepetition = this.createFromForm();
    myRepetition.dateRepetition = moment(myRepetition.dateRepetition).add({
            hours: moment(myRepetition.timeRepetition).hours(),
            minutes: moment(myRepetition.timeRepetition).minutes()
          });
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
      duration: this.editForm.get(['duration'])!.value,
      price: this.editForm.get(['price'])!.value,
      dateRepetition: this.editForm.get(['dateRepetition'])!.value
                    ? moment(this.editForm.get(['dateRepetition'])!.value, DATE_FORMAT)
                    : undefined,
      timeRepetition: this.editForm.get(['timeRepetition'])!.value
                    ? moment(this.editForm.get(['timeRepetition'])!.value, TIME_FORMAT)
                    : undefined,
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

  trackById(index: number, item: ISubject): any {
      return item.id;
    }
}
