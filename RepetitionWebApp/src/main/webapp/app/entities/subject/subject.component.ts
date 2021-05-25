import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from './subject.service';
import { SubjectDeleteDialogComponent } from './subject-delete-dialog.component';

@Component({
  selector: 'jhi-subject',
  templateUrl: './subject.component.html',
})
export class SubjectComponent implements OnInit, OnDestroy {
  subjects?: ISubject[];
  eventSubscriber?: Subscription;

  constructor(protected subjectService: SubjectService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubjects();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubject): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubjects(): void {
    this.eventSubscriber = this.eventManager.subscribe('subjectListModification', () => this.loadAll());
  }

  delete(subject: ISubject): void {
    const modalRef = this.modalService.open(SubjectDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subject = subject;
  }
}
