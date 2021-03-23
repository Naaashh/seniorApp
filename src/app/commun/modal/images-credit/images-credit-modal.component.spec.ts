import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImagesCreditModalComponent} from './images-credit-modal.component';

describe('ImagesCreditComponent', () => {
  let component: ImagesCreditModalComponent;
  let fixture: ComponentFixture<ImagesCreditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesCreditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesCreditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
