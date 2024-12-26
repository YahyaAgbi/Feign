import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

   



  getAllVoitures(): Observable<any> {
    return this.http.get(`http://localhost:8888/voituress`);
  }

  getVoitureById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8888/voitures/${id}`);
  }

  createVoiture(clientId: number, voiture: any): Observable<any> {
    return this.http.post(`http://localhost:8888/voitures/${clientId}`, voiture);
  }

  updateVoiture(id: number, voiture: any): Observable<any> {
    return this.http.put(`http://localhost:8888/voitures/${id}`, voiture);
  }

  deleteVoiture(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8888/voitures/${id}`);
  }

  getAllClients(): Observable<any> {
    return this.http.get(`http://localhost:8888/clients`);
  }
  saveClient(client: Client): Observable<any> {
    return this.http.post('http://localhost:8888/client', client);
}

UpdateClient(id: number, client: Client): Observable<any> {
    return this.http.put(`http://localhost:8888/client/${id}`, client);
}

DeleteClient(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8888/client/${id}`);
}

}
