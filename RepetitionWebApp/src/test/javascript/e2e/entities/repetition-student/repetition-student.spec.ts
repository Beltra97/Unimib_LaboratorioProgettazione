import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  RepetitionStudentComponentsPage,
  RepetitionStudentDeleteDialog,
  RepetitionStudentUpdatePage,
} from './repetition-student.page-object';

const expect = chai.expect;

describe('RepetitionStudent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let repetitionStudentComponentsPage: RepetitionStudentComponentsPage;
  let repetitionStudentUpdatePage: RepetitionStudentUpdatePage;
  let repetitionStudentDeleteDialog: RepetitionStudentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RepetitionStudents', async () => {
    await navBarPage.goToEntity('repetition-student');
    repetitionStudentComponentsPage = new RepetitionStudentComponentsPage();
    await browser.wait(ec.visibilityOf(repetitionStudentComponentsPage.title), 5000);
    expect(await repetitionStudentComponentsPage.getTitle()).to.eq('repetitionWebApp.repetitionStudent.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(repetitionStudentComponentsPage.entities), ec.visibilityOf(repetitionStudentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RepetitionStudent page', async () => {
    await repetitionStudentComponentsPage.clickOnCreateButton();
    repetitionStudentUpdatePage = new RepetitionStudentUpdatePage();
    expect(await repetitionStudentUpdatePage.getPageTitle()).to.eq('repetitionWebApp.repetitionStudent.home.createOrEditLabel');
    await repetitionStudentUpdatePage.cancel();
  });

  it('should create and save RepetitionStudents', async () => {
    const nbButtonsBeforeCreate = await repetitionStudentComponentsPage.countDeleteButtons();

    await repetitionStudentComponentsPage.clickOnCreateButton();

    await promise.all([
      repetitionStudentUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      repetitionStudentUpdatePage.setDateModifiedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      repetitionStudentUpdatePage.setDateDeletedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      repetitionStudentUpdatePage.repetitionSelectLastOption(),
      repetitionStudentUpdatePage.studentSelectLastOption(),
    ]);

    expect(await repetitionStudentUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await repetitionStudentUpdatePage.getDateModifiedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateModified value to be equals to 2000-12-31'
    );
    expect(await repetitionStudentUpdatePage.getDateDeletedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDeleted value to be equals to 2000-12-31'
    );

    await repetitionStudentUpdatePage.save();
    expect(await repetitionStudentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await repetitionStudentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RepetitionStudent', async () => {
    const nbButtonsBeforeDelete = await repetitionStudentComponentsPage.countDeleteButtons();
    await repetitionStudentComponentsPage.clickOnLastDeleteButton();

    repetitionStudentDeleteDialog = new RepetitionStudentDeleteDialog();
    expect(await repetitionStudentDeleteDialog.getDialogTitle()).to.eq('repetitionWebApp.repetitionStudent.delete.question');
    await repetitionStudentDeleteDialog.clickOnConfirmButton();

    expect(await repetitionStudentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
