import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMyRepetition } from 'app/shared/model/my-repetition.model';
import { MyRepetitionService } from './my-repetition.service';
import { MyRepetitionDeleteDialogComponent } from './my-repetition-delete-dialog.component';

@Component({
  selector: 'jhi-my-repetition-history',
  templateUrl: './my-repetition-history.component.html',
})
export class MyRepetitionHistoryComponent implements OnInit, OnDestroy {
  myRepetitions?: IMyRepetition[];
  eventSubscriber?: Subscription;

  constructor(
    protected myRepetitionService: MyRepetitionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.myRepetitionService.query().subscribe((res: HttpResponse<IMyRepetition[]>) => (this.myRepetitions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMyRepetition): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
}
