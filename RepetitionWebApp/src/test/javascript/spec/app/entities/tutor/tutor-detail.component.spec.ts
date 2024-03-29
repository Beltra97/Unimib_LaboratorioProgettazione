import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { TutorDetailComponent } from 'app/entities/tutor/tutor-detail.component';
import { Tutor } from 'app/shared/model/tutor.model';

describe('Component Tests', () => {
  describe('Tutor Management Detail Component', () => {
    let comp: TutorDetailComponent;
    let fixture: ComponentFixture<TutorDetailComponent>;
    const route = ({ data: of({ tutor: new Tutor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [TutorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TutorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TutorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tutor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tutor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
