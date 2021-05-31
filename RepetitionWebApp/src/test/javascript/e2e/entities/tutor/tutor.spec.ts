import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TutorComponentsPage, TutorDeleteDialog, TutorUpdatePage } from './tutor.page-object';

const expect = chai.expect;

describe('Tutor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tutorComponentsPage: TutorComponentsPage;
  let tutorUpdatePage: TutorUpdatePage;
  let tutorDeleteDialog: TutorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tutors', async () => {
    await navBarPage.goToEntity('tutor');
    tutorComponentsPage = new TutorComponentsPage();
    await browser.wait(ec.visibilityOf(tutorComponentsPage.title), 5000);
    expect(await tutorComponentsPage.getTitle()).to.eq('repetitionWebApp.tutor.home.title');
    await browser.wait(ec.or(ec.visibilityOf(tutorComponentsPage.entities), ec.visibilityOf(tutorComponentsPage.noResult)), 1000);
  });

  it('should load create Tutor page', async () => {
    await tutorComponentsPage.clickOnCreateButton();
    tutorUpdatePage = new TutorUpdatePage();
    expect(await tutorUpdatePage.getPageTitle()).to.eq('repetitionWebApp.tutor.home.createOrEditLabel');
    await tutorUpdatePage.cancel();
  });

  it('should create and save Tutors', async () => {
    const nbButtonsBeforeCreate = await tutorComponentsPage.countDeleteButtons();

    await tutorComponentsPage.clickOnCreateButton();

    await promise.all([
      tutorUpdatePage.setNameInput('name'),
      tutorUpdatePage.setSurnameInput('surname'),
      tutorUpdatePage.setBirthDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      tutorUpdatePage.setDegreeInput('degree'),
      tutorUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      tutorUpdatePage.setDateModifiedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      tutorUpdatePage.setDateDeletedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      tutorUpdatePage.userSelectLastOption(),
      // tutorUpdatePage.subjectSelectLastOption(),
    ]);

    expect(await tutorUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await tutorUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await tutorUpdatePage.getBirthDateInput()).to.contain('2001-01-01T02:30', 'Expected birthDate value to be equals to 2000-12-31');
    expect(await tutorUpdatePage.getDegreeInput()).to.eq('degree', 'Expected Degree value to be equals to degree');
    expect(await tutorUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await tutorUpdatePage.getDateModifiedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateModified value to be equals to 2000-12-31'
    );
    expect(await tutorUpdatePage.getDateDeletedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDeleted value to be equals to 2000-12-31'
    );

    await tutorUpdatePage.save();
    expect(await tutorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tutorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Tutor', async () => {
    const nbButtonsBeforeDelete = await tutorComponentsPage.countDeleteButtons();
    await tutorComponentsPage.clickOnLastDeleteButton();

    tutorDeleteDialog = new TutorDeleteDialog();
    expect(await tutorDeleteDialog.getDialogTitle()).to.eq('repetitionWebApp.tutor.delete.question');
    await tutorDeleteDialog.clickOnConfirmButton();

    expect(await tutorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
