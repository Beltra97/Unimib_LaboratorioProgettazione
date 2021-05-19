import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { LANGUAGES } from 'app/core/language/language.constants';
import { StudentService } from 'app/entities/student/student.service';
import { TutorService } from 'app/entities/tutor/tutor.service';
import { SubjectService } from 'app/entities/subject/subject.service';
import { HttpResponse } from '@angular/common/http';
import { IStudent } from 'app/shared/model/student.model';
import { ITutor } from 'app/shared/model/tutor.model';
import { ISubject } from 'app/shared/model/subject.model';
import { Observable } from 'rxjs';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  account!: Account;
  student?: IStudent;
  tutor?: ITutor;
  subjects2: ISubject[] = [];

  maxDate = new Date().toJSON().split('T')[0];
  DropdownVar = 1;

  success = false;
  languages = LANGUAGES;
  settingsForm = this.fb.group({
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    birthDate: '',
    degree: [''],
    subject1: [''],
    subject2: [''],
    subject3: [''],
    subject4: [''],
    subject5: [''],
    subject6: [''],
    subject7: [''],
    subject8: [''],
    subject9: [''],
    subject10: [''],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    langKey: [undefined],
  });

  optionValue = false;
  birthValue = false;

  constructor(
    private tutorService: TutorService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private languageService: JhiLanguageService
  ) {
    this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects2 = res.body || []));
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });

    if (this.account.authorities.includes('ROLE_STUDENT')) {
      this.studentService.getStudentByUser().subscribe((res: HttpResponse<IStudent>) => {
        this.student = res.body || undefined;
        this.birthValue = true;
        this.settingsForm.patchValue({
          firstName: this.student?.user?.firstName,
          lastName: this.student?.user?.lastName,
          birthDate: this.student?.birthDate?.format('YYYY-MM-DD'),
          email: this.student?.user?.email,
          langKey: this.student?.user?.langKey,
        });
      });
    } else if (this.account.authorities.includes('ROLE_TUTOR')) {
      this.optionValue = true;
      this.birthValue = true;
      this.tutorService.getTutorByUser().subscribe((res: HttpResponse<ITutor>) => {
        this.tutor = res.body || undefined;
        this.DropdownVar = this.tutor!.subjects!.length;

        this.settingsForm.patchValue({
          firstName: this.tutor?.user?.firstName,
          lastName: this.tutor?.user?.lastName,
          birthDate: this.tutor?.birthDate?.format('YYYY-MM-DD'),
          email: this.tutor?.user?.email,
          degree: this.tutor?.degree,
          langKey: this.tutor?.user?.langKey,
        });

        for (let i = 1; i <= this.DropdownVar; i++) {
          this.settingsForm.patchValue({
            ['subject' + i]: this.tutor!.subjects![i - 1].name,
          });
        }
      });
    } else if (this.account.authorities.includes('ROLE_ADMIN')) {
      this.settingsForm.patchValue({
        firstName: this.account?.firstName,
        lastName: this.account?.lastName,
        email: this.account?.email,
        langKey: this.account?.langKey,
      });
    }
  }

  save(): void {
    this.success = false;

    this.account.firstName = this.settingsForm.get('firstName')!.value;
    this.account.lastName = this.settingsForm.get('lastName')!.value;
    this.account.email = this.settingsForm.get('email')!.value;
    this.account.langKey = this.settingsForm.get('langKey')!.value;

    if (this.account.authorities.includes('ROLE_STUDENT')) {
      this.student!.birthDate = moment(this.settingsForm.get('birthDate')!.value);
      this.student!.name = this.settingsForm.get('firstName')!.value;
      this.student!.surname = this.settingsForm.get('lastName')!.value;
      if (this.student) this.studentService.update(this.student).subscribe();
    } else if (this.account.authorities.includes('ROLE_TUTOR')) {
      this.tutor!.birthDate = moment(this.settingsForm.get('birthDate')!.value);
      this.tutor!.name = this.settingsForm.get('firstName')!.value;
      this.tutor!.surname = this.settingsForm.get('lastName')!.value;
      this.tutor!.degree = this.settingsForm.get('degree')!.value;
      const subjectsSet = new Set<ISubject>();
      for (let _i = 1; _i <= this.DropdownVar; _i++) {
        if (this.settingsForm.get(['subject' + _i])!.value !== '') {
          this.subjects2.forEach(subject => {
            if (subject.name === this.settingsForm.get(['subject' + _i])!.value) subjectsSet.add(subject);
          });
        }
      }
      this.tutor!.subjects = Array.from(subjectsSet.values());
      if (this.tutor) this.tutorService.update(this.tutor).subscribe();
    }

    this.accountService.save(this.account).subscribe(() => {
      this.success = true;
      this.accountService.authenticate(this.account);
      if (this.account.langKey !== this.languageService.getCurrentLanguage()) {
        this.languageService.changeLanguage(this.account.langKey);
      }
    });
  }

  trackById(index: number, item: ISubject): any {
    return item.id;
  }
}
