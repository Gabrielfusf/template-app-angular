import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SnackbarService } from 'src/app/utils/snackBarService';
import { RouterTestingModule } from '@angular/router/testing';

import { ClienteFormComponent } from './cliente-form.component';

describe('ClienteFormComponent', () => {
  let component: ClienteFormComponent;
  let fixture: ComponentFixture<ClienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        SnackbarService,
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate', 'getCurrentNavigation']) },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                state: {
                  id: '123',
                  nome: 'Teste',
                  email: 'teste@teste.com',
                  password: '123456'
                }
              }
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with right fields', () => {
    component.createForm();
    const expectedFields = ['nome', 'email', 'password'].sort();
    expect(Object.keys(component.saveForm?.controls || {}).sort()).toEqual(expectedFields);
  });

  it('should call editClient', fakeAsync(() => {
    spyOn(component.snackbarService, 'openSnackBar');
    spyOn(component.clienteService, 'putClient').and.returnValue(of({}));
    component.routeParams = { nome: 'teste' };
    component.editClient();
    tick();
    expect(component.loading).toBe(false);
  }));

  it('should call saveClient', fakeAsync(() => {
    spyOn(component.snackbarService, 'openSnackBar');
    spyOn(component.clienteService, 'postClients').and.returnValue(of({}));
    const fb: FormBuilder = TestBed.inject(FormBuilder);
    component.saveForm = fb.group({
      nome: ['teste'],
      email: ['teste@teste.com'],
      password: ['descrição'],
    });

    component.saveClient();
    tick();
    expect(component.loading).toBe(false);
  }));


  it('should display info message and go back if no changes are made', fakeAsync(() => {
    const fb: FormBuilder = TestBed.inject(FormBuilder);
    component.saveForm = fb.group({
      nome: ['teste'],
      email: ['teste@teste.com'],
      password: ['12345'],
    });

    component.routeParams = {
      tipoProvento: 'teste',
      nomeAbreviado: 'teste@teste.com',
      descricao: '12345',
    };


    expect(component.isNecessaryPut()).toBe(false);
  }));

});
