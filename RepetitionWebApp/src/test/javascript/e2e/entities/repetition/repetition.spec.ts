import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RepetitionComponentsPage, RepetitionDeleteDialog, RepetitionUpdatePage } from './repetition.page-object';

const expect = chai.expect;

describe('Repetition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let repetitionComponentsPage: RepetitionComponentsPage;
  let repetitionUpdatePage: RepetitionUpdatePage;
  let repetitionDeleteDialog: RepetitionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Repetitions', async () => {
    await navBarPage.goToEntity('repetition');
    repetitionComponentsPage = new RepetitionComponentsPage();
    await browser.wait(ec.visibilityOf(repetitionComponentsPage.title), 5000);
    expect(await repetitionComponentsPage.getTitle()).to.eq('repetitionWebApp.repetition.home.title');
    await browser.wait(ec.or(ec.visibilityOf(repetitionComponentsPage.entities), ec.visibilityOf(repetitionComponentsPage.noResult)), 1000);
  });

  it('should load create Repetition page', async () => {
    await repetitionComponentsPage.clickOnCreateButton();
    repetitionUpdatePage = new RepetitionUpdatePage();
    expect(await repetitionUpdatePage.getPageTitle()).to.eq('repetitionWebApp.repetition.home.createOrEditLabel');
    await repetitionUpdatePage.cancel();
  });

  it('should create and save Repetitions', async () => {
    const nbButtonsBeforeCreate = await repetitionComponentsPage.countDeleteButtons();

    await repetitionComponentsPage.clickOnCreateButton();

    await promise.all([
      repetitionUpdatePage.setTopicInput('topic'),
      repetitionUpdatePage.setAdditionalNoteInput('additionalNote'),
      repetitionUpdatePage.setDateRepetitionInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      repetitionUpdatePage.setNPartecipantsInput('5'),
      repetitionUpdatePage.setDurationInput('5'),
      repetitionUpdatePage.setPriceInput('5'),
      repetitionUpdatePage.setMeetingLinkInput('meetingLink'),
      repetitionUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      repetitionUpdatePage.setDateModifiedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      repetitionUpdatePage.setDateDeletedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      repetitionUpdatePage.tutorSelectLastOption(),
      repetitionUpdatePage.subjectSelectLastOption(),
    ]);

    expect(await repetitionUpdatePage.getTopicInput()).to.eq('topic', 'Expected Topic value to be equals to topic');
    expect(await repetitionUpdatePage.getAdditionalNoteInput()).to.eq(
      'additionalNote',
      'Expected AdditionalNote value to be equals to additionalNote'
    );
    expect(await repetitionUpdatePage.getDateRepetitionInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateRepetition value to be equals to 2000-12-31'
    );
    expect(await repetitionUpdatePage.getNPartecipantsInput()).to.eq('5', 'Expected nPartecipants value to be equals to 5');
    expect(await repetitionUpdatePage.getDurationInput()).to.eq('5', 'Expected duration value to be equals to 5');
    expect(await repetitionUpdatePage.getPriceInput()).to.eq('5', 'Expected price value to be equals to 5');
    expect(await repetitionUpdatePage.getMeetingLinkInput()).to.eq('meetingLink', 'Expected MeetingLink value to be equals to meetingLink');
    expect(await repetitionUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await repetitionUpdatePage.getDateModifiedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateModified value to be equals to 2000-12-31'
    );
    expect(await repetitionUpdatePage.getDateDeletedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDeleted value to be equals to 2000-12-31'
    );

    await repetitionUpdatePage.save();
    expect(await repetitionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await repetitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Repetition', async () => {
    const nbButtonsBeforeDelete = await repetitionComponentsPage.countDeleteButtons();
    await repetitionComponentsPage.clickOnLastDeleteButton();

    repetitionDeleteDialog = new RepetitionDeleteDialog();
    expect(await repetitionDeleteDialog.getDialogTitle()).to.eq('repetitionWebApp.repetition.delete.question');
    await repetitionDeleteDialog.clickOnConfirmButton();

    expect(await repetitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
