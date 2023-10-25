import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  constructor(private http: HttpClient) {}

  // Hàm để lấy ảnh từ Spring Boot API
  getImage(fileName: string): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.getFullUrl(`api/v1/image`)}/${fileName}`, {
      headers,
      responseType: 'blob',
      observe: 'response',
    });
  }
}
