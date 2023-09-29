import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/AppConfig';
import { Email } from 'src/app/Models/email/email';
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }

  //Lấy role
  sendMail(email: Email, studentName: string, toMail: string): void {
    this.http
      .post(this.getFullUrl(`api/v1/email?studentName=${studentName}`), email)
      .subscribe();
  }
}
