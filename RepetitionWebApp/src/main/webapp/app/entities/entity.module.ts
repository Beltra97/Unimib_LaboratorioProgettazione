import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tutor',
        loadChildren: () => import('./tutor/tutor.module').then(m => m.RepetitionWebAppTutorModule),
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.RepetitionWebAppStudentModule),
      },
      {
        path: 'repetition',
        loadChildren: () => import('./repetition/repetition.module').then(m => m.RepetitionWebAppRepetitionModule),
      },
      {
        path: 'repetition-student',
        loadChildren: () => import('./repetition-student/repetition-student.module').then(m => m.RepetitionWebAppRepetitionStudentModule),
      },
      {
        path: 'my-repetition',
        loadChildren: () => import('./my-repetition/my-repetition.module').then(m => m.RepetitionWebAppMyRepetitionModule),
      },
      {
        path: 'subject',
        loadChildren: () => import('./subject/subject.module').then(m => m.RepetitionWebAppSubjectModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class RepetitionWebAppEntityModule {}
