import { Component, OnInit } from '@angular/core';
import { Room } from '../Models/room/room';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../Services/room/room.service';
import { ContractService } from '../Services/contract/contract.service';
import { Student } from '../Models/student/student';
import Swal from 'sweetalert2';
import { BillService } from '../Services/bill/bill.service';
import { Admin } from '../Models/admin/admin';
import { AdminService } from '../Services/admin/admin.service';
import { AuthService } from '../Services/auth/auth.service';
import { BillRequestDTO } from '../Models/bill/bill-request-dto';

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
  nowDate: Date = new Date();
  roomId: number | null = null;
  finalWater: number | null = null;
  finalElectricity: number | null = null;
  admin!: Admin;
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private contractService: ContractService,
    private billService: BillService,
    private adminService: AdminService,
    private authService: AuthService
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
    this.adminService
      .getAdminByNoAdmin(this.authService.getUsername())
      .subscribe({
        next: (response: Admin) => {
          this.admin = response;
        },
        error: (error) => {},
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
  handleAcceptBill() {
    if (this.finalElectricity && this.finalWater && this.roomId) {
      let request = new BillRequestDTO(
        this.finalElectricity,
        this.finalWater,
        this.roomId
      );
      this.billService.addBill(this.admin.id, request).subscribe({
        next: (response: any) => {
          Swal.fire(
            'Thành công',
            'Bạn đã thêm háo đơn điện nước vào thành công',
            'success'
          );
        },
        error: (error) => {
          Swal.fire('Thất bại', error.error.message, 'error');
        },
      });
    }
  }
  getRoomId(r: Room) {
    this.roomId = r.id;
  }
}
