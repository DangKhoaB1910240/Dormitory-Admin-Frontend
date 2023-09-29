import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/AppConfig';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoomReservationRequestDTO } from 'src/app/Models/roomreservation/room-reservation-request-dto';
import { RoomReservation } from 'src/app/Models/roomreservation/room-reservation';
@Injectable({
  providedIn: 'root',
})
export class RoomReservationService {
  private roomReservationsSubject = new BehaviorSubject<RoomReservation[]>([]);
  roomReservations$: Observable<RoomReservation[]> =
    this.roomReservationsSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  addRoomReservation(
    roomReservation: RoomReservationRequestDTO
  ): Observable<any> {
    const url = this.getFullUrl('api/v1/reservation');
    return this.http.post(url, roomReservation);
  }

  findRoomReservationsByStudentNumberAndSesmesterStatusIsTrue(
    noStudent: string
  ): Observable<RoomReservation> {
    return this.http.get<RoomReservation>(
      this.getFullUrl(`api/v1/reservation/student/${noStudent}`)
    );
  }
  findRoomReservationsBySesmesterStatusIsTrue(): Observable<RoomReservation[]> {
    return this.http.get<RoomReservation[]>(
      this.getFullUrl(`api/v1/reservation`)
    );
  }

  deleteRoomReservationById(id: number): Observable<any> {
    const url = this.getFullUrl(`api/v1/reservation/${id}`);
    return this.http.delete(url);
  }
  updateStatusById(id: number, status: number, note: string): Observable<any> {
    const url = this.getFullUrl(`api/v1/reservation/${id}`);
    return this.http.patch(url, { status, note });
  }
}
