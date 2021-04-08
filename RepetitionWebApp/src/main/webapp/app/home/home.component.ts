import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { faSchool, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRepetition } from 'app/shared/model/repetition.model';
import { RepetitionService } from '../entities/repetition/repetition.service';

@Component({
  selector: 'jhi-ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ repetition!.subject!.name }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p style="text-align: center;">
        Topic: {{ repetition!.topic }}<br />
        Date: {{ repetition!.dateRepetition }}<br />
        Duration: {{ repetition!.duration }} minutes<br />
        Tutor: {{ repetition!.tutor!.name }} {{ repetition!.tutor!.surname }}
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
})
export class NgbdModalContentComponent {
  @Input() repetition?: IRepetition;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  faSchool = faSchool;
  faUserFriends = faUserFriends;

  dataLoaded = false;
  repetitions?: IRepetition[];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private repetitionService: RepetitionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    if (this.isAuthenticated()) {
      this.loadData();
    }
  }

  loadData(): void {
    if (!this.dataLoaded) {
      this.repetitionService.query().subscribe((res: HttpResponse<IRepetition[]>) => (this.repetitions = res.body || []));
      this.dataLoaded = true;
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.dataLoaded = false;
  }

  openDialog(repetition: IRepetition): void {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.repetition = repetition;
  }
}
