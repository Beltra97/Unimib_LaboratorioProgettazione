import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepetitionWebAppSharedModule } from 'app/shared/shared.module';
import { RepetitionComponent } from './repetition.component';
import { RepetitionDetailComponent } from './repetition-detail.component';
import { RepetitionUpdateComponent } from './repetition-update.component';
import { RepetitionDeleteDialogComponent } from './repetition-delete-dialog.component';
import { repetitionRoute } from './repetition.route';

@NgModule({
  imports: [RepetitionWebAppSharedModule, RouterModule.forChild(repetitionRoute)],
  declarations: [RepetitionComponent, RepetitionDetailComponent, RepetitionUpdateComponent, RepetitionDeleteDialogComponent],
  entryComponents: [RepetitionDeleteDialogComponent],
})
export class RepetitionWebAppRepetitionModule {}
