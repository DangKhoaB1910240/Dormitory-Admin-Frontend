import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/Models/page/page';
import { RegisterService } from 'src/app/Models/register-service/register-service';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class RegisterServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }

  getRegisterFromFilter(
    sesmester: number | null,
    schoolYear: string | null,
    major: string | null,
    numberStudent: string | null,
    gender: number | null,
    page: number = 0,
    size: number = 6
  ): Observable<Page<RegisterService>> {
    // Tạo các tham số dựa trên các tham số đầu vào
    let params = new HttpParams();
    params = params.set('page', page.toString()).set('size', size.toString());
    if (sesmester !== null) {
      params = params.set('sesmester', sesmester.toString());
    }
    if (schoolYear) {
      params = params.set('schoolYear', schoolYear);
    }
    if (major) {
      params = params.set('major', major);
    }
    if (numberStudent) {
      params = params.set('numberStudent', numberStudent);
    }
    if (gender !== null) {
      params = params.set('gender', gender.toString());
    }

    // Thực hiện HTTP GET request đến API
    return this.http.get<Page<RegisterService>>(
      this.getFullUrl(`api/v1/register-services`),
      { params }
    );
  }
  searchFilter(
    search: string,
    page: number = 0,
    size: number = 6
  ): Observable<Page<RegisterService>> {
    // Tạo các tham số dựa trên các tham số đầu vào
    let params = new HttpParams();
    params = params.set('page', page.toString()).set('size', size.toString());

    params = params.set('search', search);

    // Thực hiện HTTP GET request đến API
    return this.http.get<Page<RegisterService>>(
      this.getFullUrl(`api/v1/register-services/search`),
      { params }
    );
  }
}
