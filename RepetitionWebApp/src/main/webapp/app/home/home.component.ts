import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { faSchool, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRepetition } from 'app/shared/model/repetition.model';
import { RepetitionService } from '../entities/repetition/repetition.service';

import { NgbdModalContentComponent } from './home.info.component';

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
