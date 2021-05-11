import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RepetitionWebAppSharedModule } from 'app/shared/shared.module';
import { MyRepetitionStudentComponent } from './my-repetition-student.component';
import { MyRepetitionStudentUpdateDialogComponent } from './my-repetition-student-update-dialog.component';
import { MyRepetitionStudentDeleteDialogComponent } from './my-repetition-student-delete-dialog.component';
import { MyRepetitionStudentJoinDialogComponent } from './my-repetition-student-join-dialog.component';
import { myRepetitionStudentRoute } from './my-repetition-student.route';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  imports: [
    RepetitionWebAppSharedModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    NgxPayPalModule,
    RouterModule.forChild(myRepetitionStudentRoute)
  ],
  declarations: [
    MyRepetitionStudentComponent,
    MyRepetitionStudentUpdateDialogComponent,
    MyRepetitionStudentDeleteDialogComponent,
    MyRepetitionStudentJoinDialogComponent
  ],
  entryComponents: [
    MyRepetitionStudentDeleteDialogComponent,
    MyRepetitionStudentUpdateDialogComponent,
    MyRepetitionStudentJoinDialogComponent
  ],
})
export class RepetitionWebAppMyRepetitionStudentModule {}
