import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDeltalheComponent } from './cliente-deltalhe.component';

describe('ClienteDeltalheComponent', () => {
  let component: ClienteDeltalheComponent;
  let fixture: ComponentFixture<ClienteDeltalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteDeltalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDeltalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
