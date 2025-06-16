import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PeticionService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

 private getAuthHeaders(): HttpHeaders {
  const token = this.authService.getToken();
  console.log('Token from getAuthHeaders:', token);
  if (token) {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
  }
  return new HttpHeaders({
    Accept: 'application/json',
  });
}


  index(): Observable<any> {
    return this.http.get(`${this.baseUrl}/peticiones`);
  }

  create(peticion: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/peticiones`, peticion, { headers });
  }

  show(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/peticiones/${id}`);
  }

myPeticiones(): Observable<any> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  });
  return this.http.get(`${this.baseUrl}/mispeticiones`, { headers });
}


  firmar(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/peticiones/firmar/${id}`, {}, { headers });
  }

  delete(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/peticiones/${id}`, { headers });
  }

  update(id: string, peticion: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/peticiones/${id}`, peticion, { headers });
  }

  misPeticionesFirmadas(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/peticiones/firmadas`, { headers });
  }

  estado(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/peticiones/estado/${id}`, {}, { headers });
  }
  getCategorias() {
  return this.http.get(`${this.baseUrl}/categorias`);
}

}