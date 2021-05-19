import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { throwError, of } from 'rxjs';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { SettingsComponent } from 'app/account/settings/settings.component';
import { MockAccountService } from '../../../helpers/mock-account.service';

describe('Component Tests', () => {
  describe('SettingsComponent', () => {
    let comp: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;
    let mockAuth: MockAccountService;
    const accountValues: Account = {
      firstName: 'John',
      lastName: 'Doe',
      activated: true,
      email: 'john.doe@mail.com',
      langKey: 'en',
      login: 'john',
      authorities: [],
      imageUrl: '',
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [SettingsComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SettingsComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SettingsComponent);
      comp = fixture.componentInstance;
      mockAuth = TestBed.get(AccountService);
      mockAuth.setIdentityResponse(accountValues);
    });

    it('should send the current identity upon save', () => {
      // GIVEN
      mockAuth.saveSpy.and.returnValue(of({}));
      const settingsFormValues = {
        firstName: null,
        lastName: null,
        email: null,
        langKey: null,
        birthDate: "",
        degree: "",
        subject1: "",
        subject2: "",
        subject3: "",
        subject4: "",
        subject5: "",
        subject6: "",
        subject7: "",
        subject8: "",
        subject9: "",
        subject10: ""
      };

      // WHEN
      comp.ngOnInit();
      comp.save();

      // THEN
      expect(mockAuth.identitySpy).toHaveBeenCalled();
      expect(mockAuth.saveSpy).toHaveBeenCalledWith(accountValues);
      expect(mockAuth.authenticateSpy).toHaveBeenCalledWith(accountValues);
      expect(comp.settingsForm.value).toEqual(settingsFormValues);
    });

    it('should notify of success upon successful save', () => {
      // GIVEN
      mockAuth.saveSpy.and.returnValue(of({}));

      // WHEN
      comp.ngOnInit();
      comp.save();

      // THEN
      expect(comp.success).toBe(true);
    });

    it('should notify of error upon failed save', () => {
      // GIVEN
      mockAuth.saveSpy.and.returnValue(throwError('ERROR'));

      // WHEN
      comp.ngOnInit();
      comp.save();

      // THEN
      expect(comp.success).toBe(false);
    });
  });
});
