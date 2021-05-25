import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { TutorComponent } from 'app/entities/tutor/tutor.component';
import { TutorService } from 'app/entities/tutor/tutor.service';
import { Tutor } from 'app/shared/model/tutor.model';

describe('Component Tests', () => {
  describe('Tutor Management Component', () => {
    let comp: TutorComponent;
    let fixture: ComponentFixture<TutorComponent>;
    let service: TutorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [TutorComponent],
      })
        .overrideTemplate(TutorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TutorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TutorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tutor(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tutors && comp.tutors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
