import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { MyRepetitionComponent } from 'app/entities/my-repetition/my-repetition.component';
import { MyRepetitionService } from 'app/entities/my-repetition/my-repetition.service';
import { MyRepetition } from 'app/shared/model/my-repetition.model';

describe('Component Tests', () => {
  describe('MyRepetition Management Component', () => {
    let comp: MyRepetitionComponent;
    let fixture: ComponentFixture<MyRepetitionComponent>;
    let service: MyRepetitionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [MyRepetitionComponent],
      })
        .overrideTemplate(MyRepetitionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MyRepetitionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MyRepetitionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MyRepetition(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.myRepetitions && comp.myRepetitions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
