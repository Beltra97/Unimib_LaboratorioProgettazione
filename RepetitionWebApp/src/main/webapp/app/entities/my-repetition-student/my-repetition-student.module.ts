import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepetitionWebAppSharedModule } from 'app/shared/shared.module';
import { MyRepetitionStudentComponent } from './my-repetition-student.component';
import { MyRepetitionStudentUpdateDialogComponent } from './my-repetition-student-update-dialog.component';
import { MyRepetitionStudentDeleteDialogComponent } from './my-repetition-student-delete-dialog.component';
import { myRepetitionStudentRoute } from './my-repetition-student.route';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    RepetitionWebAppSharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(myRepetitionStudentRoute)
  ],
  declarations: [
    MyRepetitionStudentComponent,
    MyRepetitionStudentUpdateDialogComponent,
    MyRepetitionStudentDeleteDialogComponent,
  ],
  entryComponents: [
    MyRepetitionStudentDeleteDialogComponent,
    MyRepetitionStudentUpdateDialogComponent
  ],
})
export class RepetitionWebAppMyRepetitionStudentModule {}
