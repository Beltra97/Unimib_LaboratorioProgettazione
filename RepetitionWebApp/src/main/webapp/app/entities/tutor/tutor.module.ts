import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepetitionWebAppSharedModule } from 'app/shared/shared.module';
import { TutorComponent } from './tutor.component';
import { TutorDetailComponent } from './tutor-detail.component';
import { TutorUpdateComponent } from './tutor-update.component';
import { TutorDeleteDialogComponent } from './tutor-delete-dialog.component';
import { tutorRoute } from './tutor.route';

@NgModule({
  imports: [RepetitionWebAppSharedModule, RouterModule.forChild(tutorRoute)],
  declarations: [TutorComponent, TutorDetailComponent, TutorUpdateComponent, TutorDeleteDialogComponent],
  entryComponents: [TutorDeleteDialogComponent],
})
export class RepetitionWebAppTutorModule {}
