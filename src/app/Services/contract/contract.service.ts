import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
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
}
