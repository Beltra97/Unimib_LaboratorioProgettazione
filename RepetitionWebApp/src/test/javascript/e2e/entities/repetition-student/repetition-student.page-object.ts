import { element, by, ElementFinder } from 'protractor';

export class RepetitionStudentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-repetition-student div table .btn-danger'));
  title = element.all(by.css('jhi-repetition-student div h2#page-heading span')).first();
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

export class RepetitionStudentUpdatePage {
  pageTitle = element(by.id('jhi-repetition-student-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateCreatedInput = element(by.id('field_dateCreated'));
  dateModifiedInput = element(by.id('field_dateModified'));
  dateDeletedInput = element(by.id('field_dateDeleted'));

  repetitionSelect = element(by.id('field_repetition'));
  studentSelect = element(by.id('field_student'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
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

  async repetitionSelectLastOption(): Promise<void> {
    await this.repetitionSelect.all(by.tagName('option')).last().click();
  }

  async repetitionSelectOption(option: string): Promise<void> {
    await this.repetitionSelect.sendKeys(option);
  }

  getRepetitionSelect(): ElementFinder {
    return this.repetitionSelect;
  }

  async getRepetitionSelectedOption(): Promise<string> {
    return await this.repetitionSelect.element(by.css('option:checked')).getText();
  }

  async studentSelectLastOption(): Promise<void> {
    await this.studentSelect.all(by.tagName('option')).last().click();
  }

  async studentSelectOption(option: string): Promise<void> {
    await this.studentSelect.sendKeys(option);
  }

  getStudentSelect(): ElementFinder {
    return this.studentSelect;
  }

  async getStudentSelectedOption(): Promise<string> {
    return await this.studentSelect.element(by.css('option:checked')).getText();
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

export class RepetitionStudentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-repetitionStudent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-repetitionStudent'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
