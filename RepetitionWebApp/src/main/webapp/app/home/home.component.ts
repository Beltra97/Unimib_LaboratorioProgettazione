import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { faSchool, faUserFriends } from '@fortawesome/free-solid-svg-icons';

import { Repetition } from '../shared/repetition/repetition';
import { RepetitionService } from '../services/repetition.service';

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
    private repetitionService: RepetitionService
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
}
