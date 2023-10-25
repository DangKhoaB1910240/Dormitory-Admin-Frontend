import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/Models/feedback/feedback';
import { Student } from 'src/app/Models/student/student';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  constructor(private http: HttpClient) {}
  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.getFullUrl('api/v1/feedback'));
  }
  updateStatus(
    id: number,
    student: Student,
    roomType: string,
    numberRoom: number,
    editDate: Date,
    adminId: number,
    status: number
  ): Observable<void> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/feedback/${id}`), {
      student,
      roomType,
      numberRoom,
      editDate,
      adminId,
      status,
    });
  }
}
