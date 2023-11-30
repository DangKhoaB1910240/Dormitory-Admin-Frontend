import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Blacklist } from 'src/app/Models/blacklist/blacklist';
import { Page } from 'src/app/Models/page/page';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class BlacklistService {
  constructor(private http: HttpClient, private router: Router) {}
  private blacklistUpdatedSource = new Subject<void>();

  // Observable để các thành phần khác có thể đăng ký nhận thông báo
  blacklistUpdated$ = this.blacklistUpdatedSource.asObservable();

  // Phương thức để thông báo rằng danh sách đen đã được cập nhật
  updateBlacklist() {
    this.blacklistUpdatedSource.next();
  }
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllBlackList(
    page: number = 0,
    size: number = 6
  ): Observable<Page<Blacklist>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Blacklist>>(this.getFullUrl('api/v1/blacklist'), {
      params,
    });
  }
  addToBlackList(blacklist: any): Observable<void> {
    return this.http.post<void>(this.getFullUrl(`api/v1/blacklist`), blacklist);
  }
}
