import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TopicComponentsPage, TopicDeleteDialog, TopicUpdatePage } from './topic.page-object';

const expect = chai.expect;

describe('Topic e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let topicComponentsPage: TopicComponentsPage;
  let topicUpdatePage: TopicUpdatePage;
  let topicDeleteDialog: TopicDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Topics', async () => {
    await navBarPage.goToEntity('topic');
    topicComponentsPage = new TopicComponentsPage();
    await browser.wait(ec.visibilityOf(topicComponentsPage.title), 5000);
    expect(await topicComponentsPage.getTitle()).to.eq('repetitionWebApp.topic.home.title');
    await browser.wait(ec.or(ec.visibilityOf(topicComponentsPage.entities), ec.visibilityOf(topicComponentsPage.noResult)), 1000);
  });

  it('should load create Topic page', async () => {
    await topicComponentsPage.clickOnCreateButton();
    topicUpdatePage = new TopicUpdatePage();
    expect(await topicUpdatePage.getPageTitle()).to.eq('repetitionWebApp.topic.home.createOrEditLabel');
    await topicUpdatePage.cancel();
  });

  it('should create and save Topics', async () => {
    const nbButtonsBeforeCreate = await topicComponentsPage.countDeleteButtons();

    await topicComponentsPage.clickOnCreateButton();

    await promise.all([
      topicUpdatePage.setNameInput('name'),
      topicUpdatePage.setDescriptionInput('description'),
      topicUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      topicUpdatePage.setDateModifiedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      topicUpdatePage.setDateDeletedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      topicUpdatePage.subjectSelectLastOption(),
    ]);

    expect(await topicUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await topicUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await topicUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await topicUpdatePage.getDateModifiedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateModified value to be equals to 2000-12-31'
    );
    expect(await topicUpdatePage.getDateDeletedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDeleted value to be equals to 2000-12-31'
    );

    await topicUpdatePage.save();
    expect(await topicUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await topicComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Topic', async () => {
    const nbButtonsBeforeDelete = await topicComponentsPage.countDeleteButtons();
    await topicComponentsPage.clickOnLastDeleteButton();

    topicDeleteDialog = new TopicDeleteDialog();
    expect(await topicDeleteDialog.getDialogTitle()).to.eq('repetitionWebApp.topic.delete.question');
    await topicDeleteDialog.clickOnConfirmButton();

    expect(await topicComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
