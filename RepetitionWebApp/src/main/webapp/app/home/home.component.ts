import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { faSchool, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';
import { MyRepetitionStudentService } from 'app/entities/my-repetition-student/my-repetition-student.service';
// import { IRepetition } from 'app/shared/model/repetition.model';
// import { RepetitionService } from '../entities/repetition/repetition.service';

import { IMyRepetition, MyRepetition } from 'app/shared/model/my-repetition.model';
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
  dataFound = false;
  repetitionsStudent?: IMyRepetitionStudent[];
  repetitionsFound?: IMyRepetitionStudent[];
  repetitionsTutor?: IMyRepetition[];

  minDate = new Date().toJSON().split('T')[0];
  pipe = new DatePipe('en-US');

  findForm = this.fb.group({
    findGlobal: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    findDate: [''],
    findGroup: ['', [Validators.required]],
  });

  findSubjectTutor = '';
  findDate = '';
  findGroup = 'true';

  debug = '';

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private repetitionStudentService: MyRepetitionStudentService,
    private repetitionTutorService: MyRepetitionService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    if (this.isAuthenticated()) {
      this.loadStudentData();
      this.loadTutorData();

      this.findSubjectTutor = '';
      this.findDate = '';
      this.findGroup = 'true';
    }
  }

  // This function is used to load data for the student accounts
  loadStudentData(): void {
    if (!this.dataStudentLoaded) {
      this.repetitionStudentService
        .query()
        .subscribe((res: HttpResponse<IMyRepetitionStudent[]>) => (this.repetitionsStudent = res.body || []));
      this.dataStudentLoaded = true;
    }
  }

  // This function is used to load data for the tutor accounts
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
    this.dataFound = false;
    this.dataStudentLoaded = false;
    this.dataTutorLoaded = false;
  }

  openDialog(repetition: IMyRepetitionStudent): void {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.repetition = repetition;
  }

  // This function is used to set values collected from html before the search
  setValues(): void {
    this.findSubjectTutor = this.findForm.get(['findGlobal'])!.value;
    this.findSubjectTutor = this.findSubjectTutor.toLowerCase().trim();
    this.findDate = this.findForm.get(['findDate'])!.value;
    this.findGroup = this.findForm.get(['findGroup'])!.value;

    this.repetitionsFound = [];
  }

  // This function is used to carry out a personalized search for repetitions
  search(): void {
    this.setValues();

    // subject != null e data == null
    if (this.findSubjectTutor !== '' && this.findDate === '') {
      // allow group repetitions
      if (this.findGroup === 'true') {
        for (const repetition of this.repetitionsStudent!) {
          const subject = repetition.subject!.name!.toLowerCase().trim();
          const tutorName = repetition.tutor!.name!.toLowerCase().trim();
          const tutorSurname = repetition.tutor!.surname!.toLowerCase().trim();

          if (subject === this.findSubjectTutor || tutorName === this.findSubjectTutor || tutorSurname === this.findSubjectTutor) {
            this.repetitionsFound!.push(repetition);
          }
        }
      }
      // disallow group repetitions
      else {
        for (const repetition of this.repetitionsStudent!) {
          const subject = repetition.subject!.name!.toLowerCase().trim();
          const tutorName = repetition.tutor!.name!.toLowerCase().trim();
          const tutorSurname = repetition.tutor!.surname!.toLowerCase().trim();

          if (
            (subject === this.findSubjectTutor || tutorName === this.findSubjectTutor || tutorSurname === this.findSubjectTutor) &&
            repetition.nPartecipants === 1
          ) {
            this.repetitionsFound!.push(repetition);
          }
        }
      }
    }
    // subject != null e data != null
    else if (this.findSubjectTutor !== '' && this.findDate !== '') {
      // allow group repetitions
      if (this.findGroup === 'true') {
        for (const repetition of this.repetitionsStudent!) {
          const dateT = this.pipe.transform(repetition.dateRepetition, 'yyyy-MM-dd');
          const subject = repetition.subject!.name!.toLowerCase().trim();
          const tutorName = repetition.tutor!.name!.toLowerCase().trim();
          const tutorSurname = repetition.tutor!.surname!.toLowerCase().trim();

          if (
            (subject === this.findSubjectTutor || tutorName === this.findSubjectTutor || tutorSurname === this.findSubjectTutor) &&
            dateT!.toString() === this.findDate
          ) {
            this.repetitionsFound!.push(repetition);
          }
        }
      }
      // disallow group repetitions
      else {
        for (const repetition of this.repetitionsStudent!) {
          const dateT = this.pipe.transform(repetition.dateRepetition, 'yyyy-MM-dd');
          const subject = repetition.subject!.name!.toLowerCase().trim();
          const tutorName = repetition.tutor!.name!.toLowerCase().trim();
          const tutorSurname = repetition.tutor!.surname!.toLowerCase().trim();

          if (
            (subject === this.findSubjectTutor || tutorName === this.findSubjectTutor || tutorSurname === this.findSubjectTutor) &&
            repetition.nPartecipants === 1 &&
            dateT!.toString() === this.findDate
          ) {
            this.repetitionsFound!.push(repetition);
          }
        }
      }
    }
    // subject == null e data != null
    else if (this.findSubjectTutor === '' && this.findDate !== '') {
      // allow group repetitions
      if (this.findGroup === 'true') {
        for (const repetition of this.repetitionsStudent!) {
          const dateT = this.pipe.transform(repetition.dateRepetition, 'yyyy-MM-dd');

          if (dateT!.toString() === this.findDate) {
            this.repetitionsFound!.push(repetition);
          }
        }
      }
      // disallow group repetitions
      else {
        for (const repetition of this.repetitionsStudent!) {
          const dateT = this.pipe.transform(repetition.dateRepetition, 'yyyy-MM-dd');

          if (repetition.nPartecipants === 1 && dateT!.toString() === this.findDate) {
            this.repetitionsFound!.push(repetition);
          }
        }
      }
    }
    // subject == null e data == null
    else {
      // allow group repetitions
      if (this.findGroup === 'true') {
        for (const repetition of this.repetitionsStudent!) {
          this.repetitionsFound!.push(repetition);
        }
      }
      // disallow group repetitions
      else {
        for (const repetition of this.repetitionsStudent!) {
          this.debug = this.debug + 'Subject: ' + repetition.subject!.name + ' - Partecipants: ' + repetition.nPartecipants + ' ***** ';
          if (repetition.nPartecipants === 1) {
            this.repetitionsFound!.push(repetition);
          }
        }
      }
    }

    this.dataFound = true;
  }
}
