import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  MyRepetitionStudentComponentsPage,
  MyRepetitionStudentDeleteDialog,
  MyRepetitionStudentUpdatePage,
} from './my-repetition-student.page-object';

const expect = chai.expect;

describe('MyRepetitionStudent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let myRepetitionStudentComponentsPage: MyRepetitionStudentComponentsPage;
  let myRepetitionStudentUpdatePage: MyRepetitionStudentUpdatePage;
  let myRepetitionStudentDeleteDialog: MyRepetitionStudentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MyRepetitionStudents', async () => {
    await navBarPage.goToEntity('my-repetition-student');
    myRepetitionStudentComponentsPage = new MyRepetitionStudentComponentsPage();
    await browser.wait(ec.visibilityOf(myRepetitionStudentComponentsPage.title), 5000);
    expect(await myRepetitionStudentComponentsPage.getTitle()).to.eq('repetitionWebApp.myRepetitionStudent.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(myRepetitionStudentComponentsPage.entities), ec.visibilityOf(myRepetitionStudentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MyRepetitionStudent page', async () => {
    await myRepetitionStudentComponentsPage.clickOnCreateButton();
    myRepetitionStudentUpdatePage = new MyRepetitionStudentUpdatePage();
    expect(await myRepetitionStudentUpdatePage.getPageTitle()).to.eq('repetitionWebApp.myRepetitionStudent.home.createOrEditLabel');
    await myRepetitionStudentUpdatePage.cancel();
  });

  it('should create and save MyRepetitionStudents', async () => {
    const nbButtonsBeforeCreate = await myRepetitionStudentComponentsPage.countDeleteButtons();

    await myRepetitionStudentComponentsPage.clickOnCreateButton();

    await promise.all([myRepetitionStudentUpdatePage.setIdRepetitionInput('5'), myRepetitionStudentUpdatePage.setTopicInput('topic')]);

    expect(await myRepetitionStudentUpdatePage.getIdRepetitionInput()).to.eq('5', 'Expected idRepetition value to be equals to 5');
    expect(await myRepetitionStudentUpdatePage.getTopicInput()).to.eq('topic', 'Expected Topic value to be equals to topic');

    await myRepetitionStudentUpdatePage.save();
    expect(await myRepetitionStudentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await myRepetitionStudentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MyRepetitionStudent', async () => {
    const nbButtonsBeforeDelete = await myRepetitionStudentComponentsPage.countDeleteButtons();
    await myRepetitionStudentComponentsPage.clickOnLastDeleteButton();

    myRepetitionStudentDeleteDialog = new MyRepetitionStudentDeleteDialog();
    expect(await myRepetitionStudentDeleteDialog.getDialogTitle()).to.eq('repetitionWebApp.myRepetitionStudent.delete.question');
    await myRepetitionStudentDeleteDialog.clickOnConfirmButton();

    expect(await myRepetitionStudentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
