import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonBasico } from './boton-basico';

describe('BotonBasico', () => {
  let component: BotonBasico;
  let fixture: ComponentFixture<BotonBasico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonBasico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonBasico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
