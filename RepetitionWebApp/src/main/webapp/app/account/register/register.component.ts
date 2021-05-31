import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { RegisterService } from './register.service';

import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject/subject.service';

type SelectableEntity = ISubject;

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  subjects: ISubject[] = [];

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  public DropdownVar = 1; 

  maxDate = new Date().toJSON().split('T')[0];

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), 
                Validators.pattern('^[A-Za-z\\s]+')]],
    surname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50),
                Validators.pattern('^[A-Za-z\\s]+')]],
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    birthdate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    role: ['', [Validators.required]],
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
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  });

  optionValue: any;

  constructor(
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    protected subjectService: SubjectService,
    private registerService: RegisterService,
    private fb: FormBuilder
  ) {
    this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
  }

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const login = this.registerForm.get(['login'])!.value;
      const firstName = this.registerForm.get(['name'])!.value;
      const lastName = this.registerForm.get(['surname'])!.value;
      const email = this.registerForm.get(['email'])!.value;
      const birthdate = this.registerForm.get(['birthdate'])!.value;
      const isStudent = this.registerForm.get(['role'])!.value;
      const degree = this.registerForm.get(['degree'])!.value;
      const subjectsSet = new Set<number>();
      for(let _i = 1; _i <= this.DropdownVar; _i++){
        if(this.registerForm.get(['subject' + _i])!.value !== ""){
          subjectsSet.add(this.registerForm.get(['subject' + _i])!.value);
        }
      }
      const subject = Array.from(subjectsSet.values());
      
      this.registerService.save({ login, firstName, lastName, birthdate, degree, subject, isStudent, email, password, langKey: this.languageService.getCurrentLanguage() }).subscribe( 
        () => (this.success = true),
        response => this.processError(response)
      );
    }
  }

  openLogin(): void {
    this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }

  trackById(index: number, item: ISubject): any {
    return item.id;
  }
}
