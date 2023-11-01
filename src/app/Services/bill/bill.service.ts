import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BillRequestDTO } from 'src/app/Models/bill/bill-request-dto';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  addBill(adminId: number, request: BillRequestDTO): Observable<void> {
    return this.http.post<void>(
      this.getFullUrl(`api/v1/bill/admin/${adminId}`),
      request
    );
  }
}
