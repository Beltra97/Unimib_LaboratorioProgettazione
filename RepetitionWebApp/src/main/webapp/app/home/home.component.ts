import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { faSchool, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Repetition } from '../shared/repetition/repetition';
import { RepetitionService } from '../services/repetition.service';

@Component({
  selector: 'jhi-ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ repetition.subject }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p style="text-align: center;">{{ repetition.description }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
})
export class NgbdModalContentComponent {
  @Input() repetition: Repetition;

  constructor(public activeModal: NgbActiveModal) {
    this.repetition = {
      id: '',
      subject: '',
      description: '',
    };
  }
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

  repetitions: Repetition[] = this.repetitionService.getRepetitions();

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private repetitionService: RepetitionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.repetitions = this.repetitionService.getRepetitions();
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
  }

  openDialog(repetition: Repetition): void {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.repetition = repetition;
  }
}
