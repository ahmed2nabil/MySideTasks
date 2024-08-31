import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtectedDataComponent } from './protected-data.component';

describe('ProtectedDataComponent', () => {
  let component: ProtectedDataComponent;
  let fixture: ComponentFixture<ProtectedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
