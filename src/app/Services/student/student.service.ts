import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/Models/student/student';
import { AppConfig } from 'src/app/config/AppConfig';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from 'src/app/Models/page/page';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getStudentByNoStudent(noStudent: string): Observable<Student> {
    return this.http.get<Student>(
      this.getFullUrl(`api/v1/student?numberStudent=${noStudent}`)
    );
  }
  getStudentGratuation(
    page: number = 0,
    size: number = 6
  ): Observable<Page<Student>> {
    let params = new HttpParams();
    params = params.set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Student>>(
      this.getFullUrl(`api/v1/student/gratuation`),
      { params }
    );
  }
}
