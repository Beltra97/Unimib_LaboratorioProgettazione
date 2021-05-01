import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRepetitionStudent, RepetitionStudent } from 'app/shared/model/repetition-student.model';
import { RepetitionStudentService } from './repetition-student.service';
import { IRepetition } from 'app/shared/model/repetition.model';
import { RepetitionService } from 'app/entities/repetition/repetition.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student/student.service';

type SelectableEntity = IRepetition | IStudent;

@Component({
  selector: 'jhi-repetition-student-update',
  templateUrl: './repetition-student-update.component.html',
})
export class RepetitionStudentUpdateComponent implements OnInit {
  isSaving = false;
  repetitions: IRepetition[] = [];
  students: IStudent[] = [];

  editForm = this.fb.group({
    id: [],
    dateCreated: [],
    dateModified: [],
    dateDeleted: [],
    repetition: [],
    student: [],
  });

  constructor(
    protected repetitionStudentService: RepetitionStudentService,
    protected repetitionService: RepetitionService,
    protected studentService: StudentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ repetitionStudent }) => {
      if (!repetitionStudent.id) {
        const today = moment().startOf('day');
        repetitionStudent.dateCreated = today;
        repetitionStudent.dateModified = today;
        repetitionStudent.dateDeleted = today;
      }

      this.updateForm(repetitionStudent);

      this.repetitionService.query().subscribe((res: HttpResponse<IRepetition[]>) => (this.repetitions = res.body || []));

      this.studentService.query().subscribe((res: HttpResponse<IStudent[]>) => (this.students = res.body || []));
    });
  }

  updateForm(repetitionStudent: IRepetitionStudent): void {
    this.editForm.patchValue({
      id: repetitionStudent.id,
      dateCreated: repetitionStudent.dateCreated ? repetitionStudent.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateModified: repetitionStudent.dateModified ? repetitionStudent.dateModified.format(DATE_TIME_FORMAT) : null,
      dateDeleted: repetitionStudent.dateDeleted ? repetitionStudent.dateDeleted.format(DATE_TIME_FORMAT) : null,
      repetition: repetitionStudent.repetition,
      student: repetitionStudent.student,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const repetitionStudent = this.createFromForm();
    if (repetitionStudent.id !== undefined) {
      this.subscribeToSaveResponse(this.repetitionStudentService.update(repetitionStudent));
    } else {
      this.subscribeToSaveResponse(this.repetitionStudentService.create(repetitionStudent));
    }
  }

  private createFromForm(): IRepetitionStudent {
    return {
      ...new RepetitionStudent(),
      id: this.editForm.get(['id'])!.value,
      dateCreated: this.editForm.get(['dateCreated'])!.value
        ? moment(this.editForm.get(['dateCreated'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateModified: this.editForm.get(['dateModified'])!.value
        ? moment(this.editForm.get(['dateModified'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateDeleted: this.editForm.get(['dateDeleted'])!.value
        ? moment(this.editForm.get(['dateDeleted'])!.value, DATE_TIME_FORMAT)
        : undefined,
      repetition: this.editForm.get(['repetition'])!.value,
      student: this.editForm.get(['student'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepetitionStudent>>): void {
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
