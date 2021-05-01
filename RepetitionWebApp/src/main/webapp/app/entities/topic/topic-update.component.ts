import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITopic, Topic } from 'app/shared/model/topic.model';
import { TopicService } from './topic.service';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject/subject.service';

@Component({
  selector: 'jhi-topic-update',
  templateUrl: './topic-update.component.html',
})
export class TopicUpdateComponent implements OnInit {
  isSaving = false;
  subjects: ISubject[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    dateCreated: [],
    dateModified: [],
    dateDeleted: [],
    subject: [],
  });

  constructor(
    protected topicService: TopicService,
    protected subjectService: SubjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ topic }) => {
      if (!topic.id) {
        const today = moment().startOf('day');
        topic.dateCreated = today;
        topic.dateModified = today;
        topic.dateDeleted = today;
      }

      this.updateForm(topic);

      this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
    });
  }

  updateForm(topic: ITopic): void {
    this.editForm.patchValue({
      id: topic.id,
      name: topic.name,
      description: topic.description,
      dateCreated: topic.dateCreated ? topic.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateModified: topic.dateModified ? topic.dateModified.format(DATE_TIME_FORMAT) : null,
      dateDeleted: topic.dateDeleted ? topic.dateDeleted.format(DATE_TIME_FORMAT) : null,
      subject: topic.subject,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const topic = this.createFromForm();
    if (topic.id !== undefined) {
      this.subscribeToSaveResponse(this.topicService.update(topic));
    } else {
      this.subscribeToSaveResponse(this.topicService.create(topic));
    }
  }

  private createFromForm(): ITopic {
    return {
      ...new Topic(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateCreated: this.editForm.get(['dateCreated'])!.value
        ? moment(this.editForm.get(['dateCreated'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateModified: this.editForm.get(['dateModified'])!.value
        ? moment(this.editForm.get(['dateModified'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateDeleted: this.editForm.get(['dateDeleted'])!.value
        ? moment(this.editForm.get(['dateDeleted'])!.value, DATE_TIME_FORMAT)
        : undefined,
      subject: this.editForm.get(['subject'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITopic>>): void {
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
