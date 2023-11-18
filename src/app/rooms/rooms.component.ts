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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  room: Room = {
    id: null,
    numberRoom: 0,
    currentQuantity: null,
    enable: null,
    gender: null,
  };
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
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      //Danh sách room
      this.getAllRoomByRoomType_Id(this.id);
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
  getAllRoomByRoomType_Id(id: number) {
    this.roomService.getAllRoomByRoomType_Id(id).subscribe({
      next: (response: Room[]) => {
        this.rooms = response;
      },
      error: (error) => {
        if (error.error) {
          this.errorMessage = 'Không có loại phòng này. Quay lại ';
        }
      },
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
    if (!this.finalElectricity || !this.finalWater) {
      Swal.fire('Thất bại', 'Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }
    if (this.finalElectricity <= 0) {
      Swal.fire('Thất bại', 'Vui lòng nhập chỉ số điện cuối > 0', 'error');
      return;
    }
    if (this.finalWater <= 0) {
      Swal.fire('Thất bại', 'Vui lòng nhập chỉ số nước cuối > 0', 'error');
      return;
    }
    if (this.finalElectricity && this.finalWater && this.roomId) {
      let request = new BillRequestDTO(
        this.finalElectricity,
        this.finalWater,
        this.roomId
      );
      this.spinner.show();
      this.billService.addBill(this.admin.id, request).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          Swal.fire(
            'Thành công',
            'Bạn đã thêm háo đơn điện nước vào thành công',
            'success'
          );
          this.finalElectricity = null;
          this.finalWater = null;
        },
        error: (error) => {
          this.spinner.hide();
          Swal.fire('Thất bại', error.error.message, 'error');
        },
      });
    }
  }
  getRoomId(r: Room) {
    this.roomId = r.id;
  }
  createRoom() {
    const r = {
      gender: this.room.gender,
      numberRoom: this.room.numberRoom,
      roomType: {
        id: this.id,
      },
    };
    if (this.room.gender == null || this.room.numberRoom == 0) {
      Swal.fire('Có lỗi !', 'Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }

    this.roomService.createRoom(r).subscribe({
      next: (response: void) => {
        Swal.fire('Thành công', 'Thêm phòng thành công', 'success');

        this.room.gender = null;
        this.room.numberRoom = 0;
        this.getAllRoomByRoomType_Id(this.id);
      },
      error: (error) => {
        Swal.fire('Thất bại', error.error.message, 'error');
      },
    });
  }
  updateEnable(r: Room) {
    r.enable = !r.enable;
    this.roomService.updateRoom(r.id!, r).subscribe({
      next: (response: void) => {
        Swal.fire('Thành công', 'Bạn đã cập nhật thành công', 'success');
      },
      error: (error) => {
        Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
      },
    });
  }
}
