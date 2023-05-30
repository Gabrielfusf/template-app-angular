import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getFieldErrorFromForm, markAllFieldAsDirty } from 'src/app/utils/form/form/form';
import { ERROR_500, SAVE_SUCESS, VERIFY_FORM } from 'src/app/utils/messages/messages';
import { SnackbarService } from 'src/app/utils/snackBarService';
import { clientSave } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  saveForm?: FormGroup;
  loading:  boolean = false;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.saveForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    this.saveForm?.markAllAsTouched();
    markAllFieldAsDirty(this.saveForm);


    if (this.saveForm?.invalid) {
      this.snackbarService.openSnackBar(VERIFY_FORM, 'Fechar');
      return;
    }

    this.saveClient();

  }

  saveClient(){
    const params: clientSave = {
      nome: this.saveForm?.value.nome,
      email: this.saveForm?.value.email,
      password: this.saveForm?.value.password,
    }
    this.loading = true;
    this.clienteService.postClients(params).subscribe({
      next: (sucess) => {
        this.loading = false;
        this.snackbarService.openSnackBar(SAVE_SUCESS, 'Fechar');
        this.router.navigate(['/cliente']);
        
      },
      error: (err) => {
        this.loading = false;
        this.snackbarService.openSnackBar(ERROR_500, 'Fechar');
      },
    });


  }

  getFieldError(field: string) {
    return getFieldErrorFromForm(this.saveForm, field);
  }



}
