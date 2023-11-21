import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
import { ContractResponseDto } from 'src/app/Models/contract/contract-response-dto';
import { Page } from 'src/app/Models/page/page';
import { Student } from 'src/app/Models/student/student';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  addContract(contract: Contract): Observable<any> {
    return this.http.post(this.getFullUrl('api/v1/contract'), contract);
  }
  getAllStudentsFromContract(
    roomTypeId: number,
    numberRoom: number
  ): Observable<Student[]> {
    return this.http.get<Student[]>(
      this.getFullUrl(
        `api/v1/contract/student/roomtype/${roomTypeId}/room/${numberRoom}`
      )
    );
  }

  getContractsFromFilter(
    sesmester: number | null,
    schoolYear: string | null,
    major: string | null,
    numberStudent: string | null,
    gender: number | null,
    page: number = 0,
    size: number = 6
  ): Observable<Page<ContractResponseDto>> {
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
    return this.http.get<Page<ContractResponseDto>>(
      this.getFullUrl(`api/v1/contract`),
      { params }
    );
  }
}
