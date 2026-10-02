import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewClaims } from './new-claims';

describe('NewClaims', () => {
  let component: NewClaims;
  let fixture: ComponentFixture<NewClaims>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClaims],
    }).compileComponents();

    fixture = TestBed.createComponent(NewClaims);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
