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
    await signInPage.autoSignInUsing('tutor', '12345a');
  });

  it('should load MyRepetitions', async () => {
    await navBarPage.clickOnMyRepetition();
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
      myRepetitionUpdatePage.subjectSelectLastOption(),
      myRepetitionUpdatePage.setDateRepetitionInput('31/12/2021' + protractor.Key.TAB + '02:30AM'),
      myRepetitionUpdatePage.setDurationInput('60'),
      myRepetitionUpdatePage.setPriceInput('9.99'),
    ]);

    expect(await myRepetitionUpdatePage.getDurationInput()).to.eq('60', 'Expected duration value to be equals to 60');
    expect(await myRepetitionUpdatePage.getPriceInput()).to.eq('9.99', 'Expected price value to be equals to 9.99');

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
