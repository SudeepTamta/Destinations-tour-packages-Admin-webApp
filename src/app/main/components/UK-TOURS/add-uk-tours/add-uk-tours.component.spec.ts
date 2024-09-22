import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUkToursComponent } from './add-uk-tours.component';

describe('AddUkToursComponent', () => {
  let component: AddUkToursComponent;
  let fixture: ComponentFixture<AddUkToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUkToursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUkToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
