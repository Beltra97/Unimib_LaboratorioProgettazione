import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepetitionWebAppSharedModule } from 'app/shared/shared.module';
import { MyRepetitionComponent } from './my-repetition.component';
import { MyRepetitionDetailComponent } from './my-repetition-detail.component';
import { MyRepetitionUpdateComponent } from './my-repetition-update.component';
import { MyRepetitionDeleteDialogComponent } from './my-repetition-delete-dialog.component';
import { myRepetitionRoute } from './my-repetition.route';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    RepetitionWebAppSharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterModule.forChild(myRepetitionRoute),
  ],
  declarations: [MyRepetitionComponent, MyRepetitionDetailComponent, MyRepetitionUpdateComponent, MyRepetitionDeleteDialogComponent],
  entryComponents: [MyRepetitionDeleteDialogComponent],
})
export class RepetitionWebAppMyRepetitionModule {}
