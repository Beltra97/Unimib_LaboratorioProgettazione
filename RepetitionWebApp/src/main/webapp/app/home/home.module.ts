import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { RepetitionWebAppSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { NgbdModalContentComponent } from './home.info.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    RepetitionWebAppSharedModule,
    RouterModule.forChild([HOME_ROUTE]),
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    MatBadgeModule,
  ],
  declarations: [HomeComponent, NgbdModalContentComponent],
})
export class RepetitionWebAppHomeModule {}
