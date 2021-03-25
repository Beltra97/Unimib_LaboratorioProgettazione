import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRepetitionStudent } from 'app/shared/model/repetition-student.model';
import { RepetitionStudentService } from './repetition-student.service';
import { RepetitionStudentDeleteDialogComponent } from './repetition-student-delete-dialog.component';

@Component({
  selector: 'jhi-repetition-student',
  templateUrl: './repetition-student.component.html',
})
export class RepetitionStudentComponent implements OnInit, OnDestroy {
  repetitionStudents?: IRepetitionStudent[];
  eventSubscriber?: Subscription;

  constructor(
    protected repetitionStudentService: RepetitionStudentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.repetitionStudentService
      .query()
      .subscribe((res: HttpResponse<IRepetitionStudent[]>) => (this.repetitionStudents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRepetitionStudents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRepetitionStudent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRepetitionStudents(): void {
    this.eventSubscriber = this.eventManager.subscribe('repetitionStudentListModification', () => this.loadAll());
  }

  delete(repetitionStudent: IRepetitionStudent): void {
    const modalRef = this.modalService.open(RepetitionStudentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.repetitionStudent = repetitionStudent;
  }
}
