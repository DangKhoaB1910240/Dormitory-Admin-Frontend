import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/Models/bill/bill';
import { BillRequestDTO } from 'src/app/Models/bill/bill-request-dto';
import { ThongKeResponseDTO } from 'src/app/Models/bill/thong-ke-response-dto';
import { Page } from 'src/app/Models/page/page';
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
  getAllBills(page: number = 0, size: number = 6): Observable<Page<Bill>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Bill>>(this.getFullUrl('api/v1/bill'), {
      params,
    });
  }
  getBillById(id: number): Observable<Bill> {
    return this.http.get<Bill>(this.getFullUrl(`api/v1/bill/${id}`));
  }
  updateBill(id: number, b: Bill): Observable<void> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/bill/${id}`), b);
  }
  // Thêm phương thức thống kê
  getThongKeByDate(date: string): Observable<ThongKeResponseDTO[]> {
    const params = new HttpParams().set('date', date);

    return this.http.get<ThongKeResponseDTO[]>(
      this.getFullUrl('api/v1/bill/statistical'),
      { params }
    );
  }
}
