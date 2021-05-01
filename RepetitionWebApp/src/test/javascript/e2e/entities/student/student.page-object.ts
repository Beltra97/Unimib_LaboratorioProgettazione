import { element, by, ElementFinder } from 'protractor';

export class StudentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-student div table .btn-danger'));
  title = element.all(by.css('jhi-student div h2#page-heading span')).first();
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

export class StudentUpdatePage {
  pageTitle = element(by.id('jhi-student-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  surnameInput = element(by.id('field_surname'));
  birthDateInput = element(by.id('field_birthDate'));
  dateCreatedInput = element(by.id('field_dateCreated'));
  dateModifiedInput = element(by.id('field_dateModified'));
  dateDeletedInput = element(by.id('field_dateDeleted'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSurnameInput(surname: string): Promise<void> {
    await this.surnameInput.sendKeys(surname);
  }

  async getSurnameInput(): Promise<string> {
    return await this.surnameInput.getAttribute('value');
  }

  async setBirthDateInput(birthDate: string): Promise<void> {
    await this.birthDateInput.sendKeys(birthDate);
  }

  async getBirthDateInput(): Promise<string> {
    return await this.birthDateInput.getAttribute('value');
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

  async userSelectFirstOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).first().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class StudentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-student-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-student'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
