import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { MyRepetitionDetailComponent } from 'app/entities/my-repetition/my-repetition-detail.component';
import { MyRepetition } from 'app/shared/model/my-repetition.model';

describe('Component Tests', () => {
  describe('MyRepetition Management Detail Component', () => {
    let comp: MyRepetitionDetailComponent;
    let fixture: ComponentFixture<MyRepetitionDetailComponent>;
    const route = ({ data: of({ myRepetition: new MyRepetition(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [MyRepetitionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MyRepetitionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MyRepetitionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load myRepetition on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.myRepetition).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
