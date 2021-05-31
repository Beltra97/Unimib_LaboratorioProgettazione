import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITutor, Tutor } from 'app/shared/model/tutor.model';
import { TutorService } from './tutor.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject/subject.service';

type SelectableEntity = IUser | ISubject;

@Component({
  selector: 'jhi-tutor-update',
  templateUrl: './tutor-update.component.html',
})
export class TutorUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  subjects: ISubject[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    birthDate: [null, [Validators.required]],
    degree: [],
    dateCreated: [],
    dateModified: [],
    dateDeleted: [],
    user: [],
    subjects: [],
  });

  constructor(
    protected tutorService: TutorService,
    protected userService: UserService,
    protected subjectService: SubjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tutor }) => {
      if (!tutor.id) {
        const today = moment().startOf('day');
        tutor.birthDate = today;
        tutor.dateCreated = today;
        tutor.dateModified = today;
        tutor.dateDeleted = today;
      }

      this.updateForm(tutor);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
    });
  }

  updateForm(tutor: ITutor): void {
    this.editForm.patchValue({
      id: tutor.id,
      name: tutor.name,
      surname: tutor.surname,
      birthDate: tutor.birthDate ? tutor.birthDate.format(DATE_TIME_FORMAT) : null,
      degree: tutor.degree,
      dateCreated: tutor.dateCreated ? tutor.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateModified: tutor.dateModified ? tutor.dateModified.format(DATE_TIME_FORMAT) : null,
      dateDeleted: tutor.dateDeleted ? tutor.dateDeleted.format(DATE_TIME_FORMAT) : null,
      user: tutor.user,
      subjects: tutor.subjects,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tutor = this.createFromForm();
    if (tutor.id !== undefined) {
      this.subscribeToSaveResponse(this.tutorService.update(tutor));
    } else {
      this.subscribeToSaveResponse(this.tutorService.create(tutor));
    }
  }

  private createFromForm(): ITutor {
    return {
      ...new Tutor(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      birthDate: this.editForm.get(['birthDate'])!.value ? moment(this.editForm.get(['birthDate'])!.value, DATE_TIME_FORMAT) : undefined,
      degree: this.editForm.get(['degree'])!.value,
      dateCreated: this.editForm.get(['dateCreated'])!.value
        ? moment(this.editForm.get(['dateCreated'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateModified: this.editForm.get(['dateModified'])!.value
        ? moment(this.editForm.get(['dateModified'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateDeleted: this.editForm.get(['dateDeleted'])!.value
        ? moment(this.editForm.get(['dateDeleted'])!.value, DATE_TIME_FORMAT)
        : undefined,
      user: this.editForm.get(['user'])!.value,
      subjects: this.editForm.get(['subjects'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITutor>>): void {
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

  getSelected(selectedVals: ISubject[], option: ISubject): ISubject {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
