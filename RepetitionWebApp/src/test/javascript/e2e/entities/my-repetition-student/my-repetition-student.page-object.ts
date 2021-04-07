import { element, by, ElementFinder } from 'protractor';

export class MyRepetitionStudentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-my-repetition-student div table .btn-danger'));
  title = element.all(by.css('jhi-my-repetition-student div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class MyRepetitionStudentUpdatePage {
  pageTitle = element(by.id('jhi-my-repetition-student-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idRepetitionInput = element(by.id('field_idRepetition'));
  topicInput = element(by.id('field_topic'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdRepetitionInput(idRepetition: string): Promise<void> {
    await this.idRepetitionInput.sendKeys(idRepetition);
  }

  async getIdRepetitionInput(): Promise<string> {
    return await this.idRepetitionInput.getAttribute('value');
  }

  async setTopicInput(topic: string): Promise<void> {
    await this.topicInput.sendKeys(topic);
  }

  async getTopicInput(): Promise<string> {
    return await this.topicInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class MyRepetitionStudentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-myRepetitionStudent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-myRepetitionStudent'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
