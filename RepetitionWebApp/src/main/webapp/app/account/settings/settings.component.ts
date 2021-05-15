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

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  account!: Account;
  student?: IStudent;
  tutor?: ITutor;
  subjects?: ISubject[] = [];
  subjects2: ISubject[] = [];
  
  maxDate = new Date().toJSON().split('T')[0];
  public DropdownVar = 1;

  success = false;
  languages = LANGUAGES;
  settingsForm = this.fb.group({
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    birthDate: [undefined, [Validators.required]],
    degree: [undefined, [Validators.required]],
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

  constructor(private tutorService: TutorService, private studentService: StudentService, private subjectService: SubjectService,
    private accountService: AccountService, private fb: FormBuilder, private languageService: JhiLanguageService) {
      this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects2 = res.body || []));
    }

  ngOnInit(): void { 
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });

    if (this.account.authorities.includes("ROLE_STUDENT")) {
      window.alert("STUDENT");
      this.studentService.getStudentByUser().subscribe((res: HttpResponse<IStudent>) => {
        this.student = res.body || undefined;

        this.settingsForm.patchValue({
          firstName: this.student?.user?.firstName,
          lastName: this.student?.user?.lastName,
          birthDate: this.student?.birthDate,
          email: this.student?.user?.email,
          langKey: this.student?.user?.langKey,
        });
      });
    } else if (this.account.authorities.includes("ROLE_TUTOR")) {
      window.alert("TUTOR");
      this.tutorService.getTutorByUser().subscribe((res: HttpResponse<ITutor>) => {
        this.tutor = res.body || undefined;
        console.log(this.tutor?.subjects);
        this.settingsForm.patchValue({
          firstName: this.tutor?.user?.firstName,
          lastName: this.tutor?.user?.lastName,
          birthDate: this.tutor?.birthDate,
          email: this.tutor?.user?.email,
          degree: this.tutor?.degree,
          // subject1: this.tutor?.subjects?[0].name,
          langKey: this.tutor?.user?.langKey,
        });
      });
    }

  }

  save(): void {
    this.success = false;

    this.account.firstName = this.settingsForm.get('firstName')!.value;
    this.account.lastName = this.settingsForm.get('lastName')!.value;
    this.account.email = this.settingsForm.get('email')!.value;
    this.account.langKey = this.settingsForm.get('langKey')!.value;

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
