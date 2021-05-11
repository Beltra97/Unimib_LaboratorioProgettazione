import { element, by, ElementFinder } from 'protractor';

export class MyRepetitionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('.btn-danger'));
  title = element.all(by.css('jhi-my-repetition div h2#page-heading span')).first();
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

export class MyRepetitionUpdatePage {
  pageTitle = element(by.id('jhi-my-repetition-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  subjectSelect = element(by.id('field_subject'));
  dateRepetitionInput = element(by.id('field_dateRepetition'));
  durationInput = element(by.id('field_duration'));
  priceInput = element(by.id('field_price'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async subjectSelectLastOption(): Promise<void> {
    await this.subjectSelect.all(by.tagName('option')).last().click();
  }

  async subjectSelectOption(option: string): Promise<void> {
    await this.subjectSelect.sendKeys(option);
  }

  getSubjectSelect(): ElementFinder {
    return this.subjectSelect;
  }

  async getSubjectSelectedOption(): Promise<string> {
    return await this.subjectSelect.element(by.css('option:checked')).getText();
  }

  async setDateRepetitionInput(dateRepetition: string): Promise<void> {
    await this.dateRepetitionInput.sendKeys(dateRepetition);
  }

  async getDateRepetitionInput(): Promise<string> {
    return await this.dateRepetitionInput.getAttribute('value');
  }

  async setDurationInput(duration: string): Promise<void> {
    await this.durationInput.sendKeys(duration);
  }

  async getDurationInput(): Promise<string> {
    return await this.durationInput.getAttribute('value');
  }

  async setPriceInput(price: string): Promise<void> {
      await this.priceInput.sendKeys(price);
    }

    async getPriceInput(): Promise<string> {
      return await this.priceInput.getAttribute('value');
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

export class MyRepetitionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-myRepetition-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-myRepetition'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
