import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoryRepetitionStudent } from 'app/shared/model/history-repetition-student.model';
import { HistoryRepetitionStudentService } from './history-repetition-student.service';

@Component({
  selector: 'jhi-history-repetition-student',
  templateUrl: './history-repetition-student.component.html',
})
export class HistoryRepetitionStudentComponent implements OnInit, OnDestroy {
  historyRepetitionStudents?: IHistoryRepetitionStudent[];
  eventSubscriber?: Subscription;

  constructor(
    protected historyRepetitionStudentService: HistoryRepetitionStudentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.historyRepetitionStudentService
      .query()
      .subscribe((res: HttpResponse<IHistoryRepetitionStudent[]>) => (this.historyRepetitionStudents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoryRepetitionStudents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoryRepetitionStudent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoryRepetitionStudents(): void {
    this.eventSubscriber = this.eventManager.subscribe('historyRepetitionStudentListModification', () => this.loadAll());
  }

}
