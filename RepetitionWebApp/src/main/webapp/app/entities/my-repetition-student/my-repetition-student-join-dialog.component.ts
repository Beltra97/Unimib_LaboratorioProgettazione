import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';
import { MyRepetitionStudentService } from './my-repetition-student.service';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  templateUrl: './my-repetition-student-join-dialog.component.html',
})
export class MyRepetitionStudentJoinDialogComponent implements OnInit {
  myRepetitionStudent?: IMyRepetitionStudent;

  public payPalConfig?: IPayPalConfig;
  step: number;

  constructor(
    protected myRepetitionStudentService: MyRepetitionStudentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {
    this.step = 1;
  }

  ngOnInit(): void {
    this.initConfig();
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmJoin(myRepetitionStudent: IMyRepetitionStudent): void {

    this.step = 2;
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

                this.myRepetitionStudentService.create(this.myRepetitionStudent!).subscribe(() => {
                      this.eventManager.broadcast('myRepetitionStudentListModification');
                      this.activeModal.close();
                    });
            }
          };
        }
    }
}
