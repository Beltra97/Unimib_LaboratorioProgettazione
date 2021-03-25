import { element, by, ElementFinder } from 'protractor';

export class RepetitionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-repetition div table .btn-danger'));
  title = element.all(by.css('jhi-repetition div h2#page-heading span')).first();
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

export class RepetitionUpdatePage {
  pageTitle = element(by.id('jhi-repetition-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  subjectInput = element(by.id('field_subject'));
  dateRepetitionInput = element(by.id('field_dateRepetition'));
  dateCreatedInput = element(by.id('field_dateCreated'));
  dateModifiedInput = element(by.id('field_dateModified'));
  dateDeletedInput = element(by.id('field_dateDeleted'));

  tutorSelect = element(by.id('field_tutor'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSubjectInput(subject: string): Promise<void> {
    await this.subjectInput.sendKeys(subject);
  }

  async getSubjectInput(): Promise<string> {
    return await this.subjectInput.getAttribute('value');
  }

  async setDateRepetitionInput(dateRepetition: string): Promise<void> {
    await this.dateRepetitionInput.sendKeys(dateRepetition);
  }

  async getDateRepetitionInput(): Promise<string> {
    return await this.dateRepetitionInput.getAttribute('value');
  }

  async setDateCreatedInput(dateCreated: string): Promise<void> {
    await this.dateCreatedInput.sendKeys(dateCreated);
  }

  async getDateCreatedInput(): Promise<string> {
    return await this.dateCreatedInput.getAttribute('value');
  }

  async setDateModifiedInput(dateModified: string): Promise<void> {
    await this.dateModifiedInput.sendKeys(dateModified);
  }

  async getDateModifiedInput(): Promise<string> {
    return await this.dateModifiedInput.getAttribute('value');
  }

  async setDateDeletedInput(dateDeleted: string): Promise<void> {
    await this.dateDeletedInput.sendKeys(dateDeleted);
  }

  async getDateDeletedInput(): Promise<string> {
    return await this.dateDeletedInput.getAttribute('value');
  }

  async tutorSelectLastOption(): Promise<void> {
    await this.tutorSelect.all(by.tagName('option')).last().click();
  }

  async tutorSelectOption(option: string): Promise<void> {
    await this.tutorSelect.sendKeys(option);
  }

  getTutorSelect(): ElementFinder {
    return this.tutorSelect;
  }

  async getTutorSelectedOption(): Promise<string> {
    return await this.tutorSelect.element(by.css('option:checked')).getText();
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

export class RepetitionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-repetition-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-repetition'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
