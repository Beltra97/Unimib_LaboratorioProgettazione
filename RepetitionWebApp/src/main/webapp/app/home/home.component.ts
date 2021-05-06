import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { faSchool, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';
import { MyRepetitionStudentService } from 'app/entities/my-repetition-student/my-repetition-student.service';
//import { IRepetition } from 'app/shared/model/repetition.model';
//import { RepetitionService } from '../entities/repetition/repetition.service';

import { IMyRepetition } from 'app/shared/model/my-repetition.model';
import { MyRepetitionService } from '../entities/my-repetition/my-repetition.service';

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

  dataStudentLoaded = false;
  dataTutorLoaded = false;
  repetitionsStudent?: IMyRepetitionStudent[];
  repetitionsTutor?: IMyRepetition[];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private repetitionStudentService: MyRepetitionStudentService,
    private repetitionTutorService: MyRepetitionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    if (this.isAuthenticated()) {
      this.loadStudentData();
      this.loadTutorData();
    }
  }

  loadStudentData(): void {
    if (!this.dataStudentLoaded) {
      this.repetitionStudentService
        .query()
        .subscribe((res: HttpResponse<IMyRepetitionStudent[]>) => (this.repetitionsStudent = res.body || []));
      this.dataStudentLoaded = true;
    }
  }

  loadTutorData(): void {
    if (!this.dataTutorLoaded) {
      this.repetitionTutorService.query().subscribe((res: HttpResponse<IMyRepetition[]>) => (this.repetitionsTutor = res.body || []));
      this.dataTutorLoaded = true;
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
    this.dataStudentLoaded = false;
    this.dataTutorLoaded = false;
  }

  openDialog(repetition: IMyRepetitionStudent): void {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.repetition = repetition;
  }
}
