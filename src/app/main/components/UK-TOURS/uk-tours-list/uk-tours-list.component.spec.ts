import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkToursListComponent } from './uk-tours-list.component';

describe('UkToursListComponent', () => {
  let component: UkToursListComponent;
  let fixture: ComponentFixture<UkToursListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UkToursListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UkToursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
