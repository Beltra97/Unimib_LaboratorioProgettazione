import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RepetitionWebAppSharedModule } from 'app/shared/shared.module';
import { HistoryRepetitionStudentComponent } from './history-repetition-student.component';
import { historyRepetitionStudentRoute } from './history-repetition-student.route';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    RepetitionWebAppSharedModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterModule.forChild(historyRepetitionStudentRoute)
  ],
  declarations: [
    HistoryRepetitionStudentComponent,
  ],
  entryComponents: [
    HistoryRepetitionStudentComponent,
  ],
})
export class RepetitionWebAppHistoryRepetitionStudentModule {}
