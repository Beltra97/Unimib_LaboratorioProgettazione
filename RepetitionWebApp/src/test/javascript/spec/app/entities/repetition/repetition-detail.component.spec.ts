import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { RepetitionDetailComponent } from 'app/entities/repetition/repetition-detail.component';
import { Repetition } from 'app/shared/model/repetition.model';

describe('Component Tests', () => {
  describe('Repetition Management Detail Component', () => {
    let comp: RepetitionDetailComponent;
    let fixture: ComponentFixture<RepetitionDetailComponent>;
    const route = ({ data: of({ repetition: new Repetition(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [RepetitionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RepetitionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepetitionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load repetition on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.repetition).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
