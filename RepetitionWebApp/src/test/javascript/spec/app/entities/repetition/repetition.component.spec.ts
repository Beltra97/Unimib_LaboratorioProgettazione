import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { RepetitionComponent } from 'app/entities/repetition/repetition.component';
import { RepetitionService } from 'app/entities/repetition/repetition.service';
import { Repetition } from 'app/shared/model/repetition.model';

describe('Component Tests', () => {
  describe('Repetition Management Component', () => {
    let comp: RepetitionComponent;
    let fixture: ComponentFixture<RepetitionComponent>;
    let service: RepetitionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [RepetitionComponent],
      })
        .overrideTemplate(RepetitionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepetitionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepetitionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Repetition(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.repetitions && comp.repetitions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
