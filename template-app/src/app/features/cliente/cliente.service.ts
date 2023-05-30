import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clientList, clientSave } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<clientList[]>(`${environment.BASE_URL}`);
  }

  postClients(client: clientSave): Observable<any>  {
    return this.http.post<any>(`${environment.BASE_URL}`, client );
  }

}
