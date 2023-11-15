import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/AppConfig';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/Models/service/service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.getFullUrl(`api/v1/service`));
  }

  updateAllServices(service: Service): Observable<void> {
    return this.http.put<void>(this.getFullUrl(`api/v1/service`), service);
  }
  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(this.getFullUrl(`api/v1/service/${id}`));
  }
  createService(service: Service): Observable<void> {
    return this.http.post<void>(this.getFullUrl(`api/v1/service`), service);
  }
}
