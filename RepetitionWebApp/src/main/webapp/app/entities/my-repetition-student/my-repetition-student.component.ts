import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';
import { MyRepetitionStudentService } from './my-repetition-student.service';
import { MyRepetitionStudentDeleteDialogComponent } from './my-repetition-student-delete-dialog.component';
import { MyRepetitionStudentUpdateDialogComponent } from './my-repetition-student-update-dialog.component';
import { MyRepetitionStudentJoinDialogComponent } from './my-repetition-student-join-dialog.component';

@Component({
  selector: 'jhi-my-repetition-student',
  templateUrl: './my-repetition-student.component.html',
})
export class MyRepetitionStudentComponent implements OnInit, OnDestroy {
  myRepetitionStudents?: IMyRepetitionStudent[];
  eventSubscriber?: Subscription;

  constructor(
    protected myRepetitionStudentService: MyRepetitionStudentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.myRepetitionStudentService
      .query()
      .subscribe((res: HttpResponse<IMyRepetitionStudent[]>) => (this.myRepetitionStudents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMyRepetitionStudents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMyRepetitionStudent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMyRepetitionStudents(): void {
    this.eventSubscriber = this.eventManager.subscribe('myRepetitionStudentListModification', () => this.loadAll());
  }

  delete(myRepetitionStudent: IMyRepetitionStudent): void {
    const modalRef = this.modalService.open(MyRepetitionStudentDeleteDialogComponent, { size: 'sm', backdrop: 'static' });
    modalRef.componentInstance.myRepetitionStudent = myRepetitionStudent;
  }

  book(myRepetitionStudent: IMyRepetitionStudent): void {
    const modalRef1 = this.modalService.open(MyRepetitionStudentUpdateDialogComponent, { size: 'sm', backdrop: 'static' });
    modalRef1.componentInstance.myRepetitionStudent = myRepetitionStudent;
  }

  join(myRepetitionStudent: IMyRepetitionStudent): void {
    const modalRef2 = this.modalService.open(MyRepetitionStudentJoinDialogComponent, { size: 'sm', backdrop: 'static' });
    modalRef2.componentInstance.myRepetitionStudent = myRepetitionStudent;
  }
}
