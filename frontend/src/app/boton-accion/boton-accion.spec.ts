import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonAccion } from './boton-accion';

describe('BotonAccion', () => {
  let component: BotonAccion;
  let fixture: ComponentFixture<BotonAccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonAccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonAccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
