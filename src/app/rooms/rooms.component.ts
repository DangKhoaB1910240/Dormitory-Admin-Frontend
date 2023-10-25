import { Component, OnInit } from '@angular/core';
import { Room } from '../Models/room/room';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../Services/room/room.service';
import { ContractService } from '../Services/contract/contract.service';
import { Student } from '../Models/student/student';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  errorMessage: string = '';
  students: Student[] = [];
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private contractService: ContractService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      //Danh sách room
      this.roomService.getAllRoomByRoomType_Id(this.id).subscribe({
        next: (response: Room[]) => {
          this.rooms = response;
        },
        error: (error) => {
          if (error.error) {
            this.errorMessage = 'Không có loại phòng này. Quay lại ';
          }
        },
      });
    });
  }
  handleViewListStudents(numberRoom: number) {
    this.contractService
      .getAllStudentsFromContract(this.id, numberRoom)
      .subscribe({
        next: (response: Student[]) => {
          this.students = response;
        },
        error: (error) => {
          Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
        },
      });
  }
}
