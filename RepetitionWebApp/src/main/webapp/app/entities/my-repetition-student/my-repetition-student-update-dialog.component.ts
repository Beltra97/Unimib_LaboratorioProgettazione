import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { FormControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ITopic } from 'app/shared/model/topic.model';
import { TopicService } from 'app/entities/topic/topic.service';
import { IMyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';
import { MyRepetitionStudentService } from './my-repetition-student.service';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'jhi-my-repetition-student-update-dialog',
  templateUrl: './my-repetition-student-update-dialog.component.html',
})
export class MyRepetitionStudentUpdateDialogComponent implements OnInit {
  myRepetitionStudent?: IMyRepetitionStudent;
  topics: ITopic[] = [];
  additionalNote: string;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  topicCtrl = new FormControl();
  filteredTopics: Observable<string[]>;
  myTopics: string[] = [];
  allTopics: string[] = [];

  @ViewChild('topicInput') topicInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;

  public payPalConfig?: IPayPalConfig;
  step: number;

  constructor(
    protected myRepetitionStudentService: MyRepetitionStudentService,
    public activeModal: NgbActiveModal,
    protected topicService: TopicService,
    protected eventManager: JhiEventManager
  ) {
    this.additionalNote = "";
    this.filteredTopics = this.topicCtrl.valueChanges.pipe(
          startWith(null),
          map((topic: string | null) => topic ? this._filter(topic) : this.allTopics.slice()));

    this.step = 1;
  }

  ngOnInit(): void {
    this.initConfig();

    this.topicService.query().subscribe((res: HttpResponse<ITopic[]>) => {
      this.topics = res.body || [];
      for (const t of this.topics) {
        if(t.subject?.id === this.myRepetitionStudent?.subject?.id)
          this.allTopics.push(t.name!)
      }
    });

  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmBook(myRepetitionStudent: IMyRepetitionStudent): void {

    this.step = 2;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;


    if ((value || '').trim()) {
      if (!this.myTopics.includes(value.trim())) {
        this.myTopics.push(value.trim());
      }
    }

    if (input) {
      input.value = '';
    }

    this.topicCtrl.setValue(null);
  }

  remove(topic: string): void {
    const index = this.myTopics.indexOf(topic);

    if (index >= 0) {
      this.myTopics.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.myTopics.includes(event.option.viewValue)) {
      this.myTopics.push(event.option.viewValue);
    }
    this.topicInput!.nativeElement.value = '';
    this.topicCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTopics.filter(topic => topic.toLowerCase().startsWith(filterValue));
  }


  private initConfig(): void {
    if(this.myRepetitionStudent != null)
    {
        this.payPalConfig = {
            currency: 'EUR',
            clientId: 'AT64NAFESdpd78G8yN2ejrQ0oArQ09ycJx44ZyPfExCqViVBOXh0R-C0fEqHExoorL6b_oqzOrvW45JF',
            createOrderOnClient: (data) => <ICreateOrderRequest> {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'EUR',
                        value: this.myRepetitionStudent!.price!.toString(),
                        breakdown: {
                            item_total: {
                                currency_code: 'EUR',
                                value: this.myRepetitionStudent!.price!.toString()
                            }
                        }
                    },
                    items: [{
                        name: 'Enterprise Subscription',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'EUR',
                            value: this.myRepetitionStudent!.price!.toString()
                        },
                    }]
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onClientAuthorization: (data) => {

                this.myRepetitionStudent!.topic = this.myTopics.join(';');
                this.myRepetitionStudent!.additionalNote = this.additionalNote;

                this.myRepetitionStudentService.create(this.myRepetitionStudent!).subscribe(() => {
                      this.eventManager.broadcast('myRepetitionStudentListModification');
                      this.activeModal.close();
                    });
            }
          };
        }
    }
}
