import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesnavComponent } from './categoriesnav.component';

describe('CategoriesnavComponent', () => {
  let component: CategoriesnavComponent;
  let fixture: ComponentFixture<CategoriesnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
