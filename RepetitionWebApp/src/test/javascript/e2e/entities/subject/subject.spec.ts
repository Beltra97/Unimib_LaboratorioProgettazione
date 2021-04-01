import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SubjectComponentsPage, SubjectDeleteDialog, SubjectUpdatePage } from './subject.page-object';

const expect = chai.expect;

describe('Subject e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subjectComponentsPage: SubjectComponentsPage;
  let subjectUpdatePage: SubjectUpdatePage;
  let subjectDeleteDialog: SubjectDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Subjects', async () => {
    await navBarPage.goToEntity('subject');
    subjectComponentsPage = new SubjectComponentsPage();
    await browser.wait(ec.visibilityOf(subjectComponentsPage.title), 5000);
    expect(await subjectComponentsPage.getTitle()).to.eq('repetitionWebApp.subject.home.title');
    await browser.wait(ec.or(ec.visibilityOf(subjectComponentsPage.entities), ec.visibilityOf(subjectComponentsPage.noResult)), 1000);
  });

  it('should load create Subject page', async () => {
    await subjectComponentsPage.clickOnCreateButton();
    subjectUpdatePage = new SubjectUpdatePage();
    expect(await subjectUpdatePage.getPageTitle()).to.eq('repetitionWebApp.subject.home.createOrEditLabel');
    await subjectUpdatePage.cancel();
  });

  it('should create and save Subjects', async () => {
    const nbButtonsBeforeCreate = await subjectComponentsPage.countDeleteButtons();

    await subjectComponentsPage.clickOnCreateButton();

    await promise.all([
      subjectUpdatePage.setNameInput('name'),
      subjectUpdatePage.setDescriptionInput('description'),
      subjectUpdatePage.setImageUrlInput('imageUrl'),
      subjectUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      subjectUpdatePage.setDateModifiedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      subjectUpdatePage.setDateDeletedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
    ]);

    expect(await subjectUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await subjectUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await subjectUpdatePage.getImageUrlInput()).to.eq('imageUrl', 'Expected ImageUrl value to be equals to imageUrl');
    expect(await subjectUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await subjectUpdatePage.getDateModifiedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateModified value to be equals to 2000-12-31'
    );
    expect(await subjectUpdatePage.getDateDeletedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDeleted value to be equals to 2000-12-31'
    );

    await subjectUpdatePage.save();
    expect(await subjectUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await subjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Subject', async () => {
    const nbButtonsBeforeDelete = await subjectComponentsPage.countDeleteButtons();
    await subjectComponentsPage.clickOnLastDeleteButton();

    subjectDeleteDialog = new SubjectDeleteDialog();
    expect(await subjectDeleteDialog.getDialogTitle()).to.eq('repetitionWebApp.subject.delete.question');
    await subjectDeleteDialog.clickOnConfirmButton();

    expect(await subjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
