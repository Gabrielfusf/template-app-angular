import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/utils/dialogService';
import { DELETE_SUCESS, ERROR_500 } from 'src/app/utils/messages/messages';
import { SnackbarService } from 'src/app/utils/snackBarService';
import { clientList } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public clientService: ClienteService,
    public snackbarService: SnackbarService,
    public dialogService: DialogService
  ) { }
  searchForm?: FormGroup;
  panelOpenState: boolean = true;
  clientList: clientList[] = [];
  loadingTable: boolean = false;
  displayedColumns: string[] = ['nome', 'email', 'opcoes'];

  ngOnInit(): void {
    this.searchClient();
  }

  searchClient(){
    this.clientService.getClients().subscribe({
      next: (client) => {
        this.clientList = client;
        this.loadingTable = false;
      },
      error: (err) => {
        this.loadingTable = false;
        this.snackbarService.openSnackBar(ERROR_500, 'Fechar');
      },
    });
  }

  deleteClient(id: number){
    this.loadingTable = true;
    this.clientService.deleteClient(id).subscribe(
      (data: any) => {
        this.snackbarService.openSnackBar(DELETE_SUCESS, 'Fechar');
        this.loadingTable = false;
        this.searchClient();
      }, (err: any) => {
        this.loadingTable = false;
        this.snackbarService.openSnackBar(ERROR_500, 'Fechar');
      }
    );
  }

  dialogConfirmDeleteClient(client: clientList){
    this.dialogService.openDeleteDialog().subscribe(result => {
      if (result) {
       console.log("RESLT", result, client)
       this.deleteClient(client.id);
      }
    });
  }

  goToNew(){
    this.router.navigate(['/cliente/new']);
  }

  goToEdit(client: clientList){
    this.router.navigateByUrl(`/cliente/edit/${client?.id}`, { state: client  });
  }

  goBack(){
    this.router.navigate(['home']);
  }

  tableCols = [
    { label: "Nome", field: "nome" },
    { label: "Email", field: "email" },
    { label: "Opções", field: "opcoes" },
  ];

}
