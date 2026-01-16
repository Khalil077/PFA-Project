import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orderslist } from './orderslist';

describe('Orderslist', () => {
  let component: Orderslist;
  let fixture: ComponentFixture<Orderslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orderslist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orderslist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
