import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    public clientService: ClienteService  
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
      },
    });
  }

  goToNew(){
    this.router.navigate(['/cliente/novo']);
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
