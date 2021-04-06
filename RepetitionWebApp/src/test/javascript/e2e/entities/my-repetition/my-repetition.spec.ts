import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MyRepetitionComponentsPage, MyRepetitionDeleteDialog, MyRepetitionUpdatePage } from './my-repetition.page-object';

const expect = chai.expect;

describe('MyRepetition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let myRepetitionComponentsPage: MyRepetitionComponentsPage;
  let myRepetitionUpdatePage: MyRepetitionUpdatePage;
  let myRepetitionDeleteDialog: MyRepetitionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MyRepetitions', async () => {
    await navBarPage.goToEntity('my-repetition');
    myRepetitionComponentsPage = new MyRepetitionComponentsPage();
    await browser.wait(ec.visibilityOf(myRepetitionComponentsPage.title), 5000);
    expect(await myRepetitionComponentsPage.getTitle()).to.eq('repetitionWebApp.myRepetition.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(myRepetitionComponentsPage.entities), ec.visibilityOf(myRepetitionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MyRepetition page', async () => {
    await myRepetitionComponentsPage.clickOnCreateButton();
    myRepetitionUpdatePage = new MyRepetitionUpdatePage();
    expect(await myRepetitionUpdatePage.getPageTitle()).to.eq('repetitionWebApp.myRepetition.home.createOrEditLabel');
    await myRepetitionUpdatePage.cancel();
  });

  it('should create and save MyRepetitions', async () => {
    const nbButtonsBeforeCreate = await myRepetitionComponentsPage.countDeleteButtons();

    await myRepetitionComponentsPage.clickOnCreateButton();

    await promise.all([
      myRepetitionUpdatePage.setSubjectInput('subject'),
      myRepetitionUpdatePage.setDateRepetitionInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      myRepetitionUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      myRepetitionUpdatePage.setDateModifiedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      myRepetitionUpdatePage.setDateDeletedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
    ]);

    expect(await myRepetitionUpdatePage.getSubjectInput()).to.eq('subject', 'Expected Subject value to be equals to subject');
    expect(await myRepetitionUpdatePage.getDateRepetitionInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateRepetition value to be equals to 2000-12-31'
    );
    expect(await myRepetitionUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await myRepetitionUpdatePage.getDateModifiedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateModified value to be equals to 2000-12-31'
    );
    expect(await myRepetitionUpdatePage.getDateDeletedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDeleted value to be equals to 2000-12-31'
    );

    await myRepetitionUpdatePage.save();
    expect(await myRepetitionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await myRepetitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MyRepetition', async () => {
    const nbButtonsBeforeDelete = await myRepetitionComponentsPage.countDeleteButtons();
    await myRepetitionComponentsPage.clickOnLastDeleteButton();

    myRepetitionDeleteDialog = new MyRepetitionDeleteDialog();
    expect(await myRepetitionDeleteDialog.getDialogTitle()).to.eq('repetitionWebApp.myRepetition.delete.question');
    await myRepetitionDeleteDialog.clickOnConfirmButton();

    expect(await myRepetitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
