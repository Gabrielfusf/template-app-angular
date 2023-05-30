import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getFieldErrorFromForm, markAllFieldAsDirty } from 'src/app/utils/form/form/form';
import { EDIT_SUCESS, ERROR_500, NO_DATA_EDIT, SAVE_SUCESS, VERIFY_FORM } from 'src/app/utils/messages/messages';
import { SnackbarService } from 'src/app/utils/snackBarService';
import { clientList, clientSave } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public router: Router,
    public snackbarService: SnackbarService
  ) { 
    this.routeParams = this.router.getCurrentNavigation()?.extras?.state;
  }

  saveForm?: FormGroup;
  loading:  boolean = false;
  routeParams: any;
  isEdit: boolean = false;
  noDataEditMessageShown: boolean = false;

  ngOnInit(): void {
    this.createForm();

    if(this.routeParams){
      this.isEdit = true;
      this.saveForm?.get("nome")?.disable();
      this.saveForm?.get("nome")?.setValue(this.routeParams.nome);
      this.saveForm?.get("email")?.setValue(this.routeParams.email);
      this.saveForm?.get("password")?.setValue(this.routeParams.password);

     }
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

    if(!this.isEdit){
      this.saveClient();
    }else{
      this.editClient();
    }
  }

  editClient(){
    const params: clientSave = {
      nome: this.routeParams.nome,
      email: this.saveForm?.value.email,
      password: this.saveForm?.value.password,
    }

    if(!this.isNecessaryPut())return;

    const id = this.routeParams.id;
    this.loading = true;
    this.clienteService.putClient(params, id).subscribe({
      next: (sucess) => {
        this.noDataEditMessageShown = false;
        this.loading = false;
        this.snackbarService.openSnackBar(EDIT_SUCESS, 'Fechar');
        this.router.navigate(['/cliente']);
        
      },
      error: (err) => {
        this.noDataEditMessageShown = false;
        this.loading = false;
        this.snackbarService.openSnackBar(ERROR_500, 'Fechar');
      },
    });
  }

  isNecessaryPut(): boolean{
  
      if(this.isEdit && this.routeParams){
        const {email , password} = this.routeParams;
       
        if(email == this.saveForm?.get("email")?.value 
        && password == this.saveForm?.get("password")?.value
        ){
          this.noDataEditMessageShown = true;
          this.saveForm?.markAsPristine();
          this.snackbarService.openSnackBar(NO_DATA_EDIT, 'Fechar');
          this.router.navigate(['/cliente']);
          return false;
        }else{
          return true;
        }
  
      }else{
        return false;
      }
    
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

  goBack(){
    this.router.navigate(['/cliente'])
  }

  getFieldError(field: string) {
    return getFieldErrorFromForm(this.saveForm, field);
  }
}
