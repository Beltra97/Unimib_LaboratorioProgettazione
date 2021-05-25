import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepetitionWebAppSharedModule } from 'app/shared/shared.module';
import { RepetitionStudentComponent } from './repetition-student.component';
import { RepetitionStudentDetailComponent } from './repetition-student-detail.component';
import { RepetitionStudentUpdateComponent } from './repetition-student-update.component';
import { RepetitionStudentDeleteDialogComponent } from './repetition-student-delete-dialog.component';
import { repetitionStudentRoute } from './repetition-student.route';

@NgModule({
  imports: [RepetitionWebAppSharedModule, RouterModule.forChild(repetitionStudentRoute)],
  declarations: [
    RepetitionStudentComponent,
    RepetitionStudentDetailComponent,
    RepetitionStudentUpdateComponent,
    RepetitionStudentDeleteDialogComponent,
  ],
  entryComponents: [RepetitionStudentDeleteDialogComponent],
})
export class RepetitionWebAppRepetitionStudentModule {}
