import { AppConfig } from 'src/app/config/AppConfig';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SesmesterService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getSesmesterByStatus(): Observable<Sesmester> {
    return this.http.get<Sesmester>(
      this.getFullUrl(`api/v1/sesmester/status/true`)
    );
  }
  getAllSesmester(): Observable<Sesmester[]> {
    return this.http.get<Sesmester[]>(this.getFullUrl(`api/v1/sesmester`));
  }
  createSesmester(s: Sesmester): Observable<void> {
    return this.http.post<void>(this.getFullUrl(`api/v1/sesmester`), s);
  }
}
