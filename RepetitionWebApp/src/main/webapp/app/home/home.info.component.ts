import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRepetition } from 'app/shared/model/repetition.model';

@Component({
  templateUrl: './home.info.component.html',
})
export class NgbdModalContentComponent {
  repetition?: IRepetition;

  constructor(public activeModal: NgbActiveModal) {}
}
