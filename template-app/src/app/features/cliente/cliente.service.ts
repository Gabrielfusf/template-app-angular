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


  putClient(client: any, id: any): Observable<any>  {
    return this.http.put<any>(`${environment.BASE_URL}/${id}`, client );
  }

  deleteClient(id: number): Observable<any>  {
    return this.http.delete<any>(`${environment.BASE_URL}/${id}`);
  }


}
