import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmasComponent } from './firmas.component';

describe('firmasComponent', () => {
  let component: FirmasComponent;
  let fixture: ComponentFixture<FirmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
