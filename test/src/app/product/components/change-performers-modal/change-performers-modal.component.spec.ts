import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePerformersModalComponent } from './change-performers-modal.component';

describe('ChangePerformersModalComponent', () => {
  let component: ChangePerformersModalComponent;
  let fixture: ComponentFixture<ChangePerformersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePerformersModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePerformersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
