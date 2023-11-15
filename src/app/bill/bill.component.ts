import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { BillService } from '../Services/bill/bill.service';
import { Bill } from '../Models/bill/bill';
import Swal from 'sweetalert2';
import { Admin } from '../Models/admin/admin';
import { AdminService } from '../Services/admin/admin.service';
import { AuthService } from '../Services/auth/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Page } from '../Models/page/page';
import { ThongKeResponseDTO } from '../Models/bill/thong-ke-response-dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  providers: [DatePipe], // Thêm DatePipe vào providers
})
export class BillComponent implements OnInit {
  constructor(
    private billService: BillService,
    private detect: ChangeDetectorRef,
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}
  nowDate: Date = new Date('2023-11-12');
  editDate: string = '';
  bills: Bill[] = [];
  finalWater: number | null = null;
  finalElectricity: number | null = null;
  billId!: number;
  bill!: Bill;
  admin2!: Admin;
  currentPage = 1;
  totalElements!: number;
  limit!: number;
  thongKe: ThongKeResponseDTO[] = [];
  t!: ThongKeResponseDTO;
  changePage(page: number): void {
    this.currentPage = page;
    this.billService.getAllBills(this.currentPage - 1, 6).subscribe({
      next: (response: Page<Bill>) => {
        this.bills = response.content;
        console.log(this.bills);
      },
    });
  }
  updateDate() {
    if (this.editDate != '') {
      this.billService.getThongKeByDate(this.editDate).subscribe({
        next: (response: ThongKeResponseDTO[]) => {
          this.thongKe = response;
        },
        error: (error) => {},
      });
    }
  }
  ngOnInit(): void {
    this.adminService
      .getAdminByNoAdmin(this.authService.getUsername())
      .subscribe({
        next: (response: Admin) => {
          this.admin2 = response;
        },
        error: (error) => {},
      });
    this.getAllBills();
    this.thongKeBills();
  }
  thongKeBills() {
    const formattedDate = this.datePipe.transform(this.nowDate, 'yyyy-MM-dd');
    console.log(formattedDate);
    if (typeof formattedDate === 'string') {
      this.billService.getThongKeByDate(formattedDate).subscribe({
        next: (response: ThongKeResponseDTO[]) => {
          this.thongKe = response;
        },
        error: (error) => {},
      });
    }
  }
  showRoomType(t: ThongKeResponseDTO) {
    this.t = t;
    this.detect.detectChanges();
  }
  getAllBills() {
    this.billService.getAllBills().subscribe({
      next: (response: any) => {
        console.log(response.content);
        this.bills = response.content;
        this.totalElements = response.totalElements;
        this.limit = response.size;
        this.detect.detectChanges();
      },
      error: (error) => {},
    });
  }
  getBillId(b: Bill) {
    this.billId = b.id;
    this.billService.getBillById(this.billId).subscribe({
      next: (response: Bill) => {
        this.bill = response;
        this.finalElectricity = this.bill.finalElectricity;
        this.finalWater = this.bill.finalWater;
      },
      error: (error) => {
        Swal.fire('Có lỗi', error.error.message, 'error');
      },
    });
  }
  updateBill() {
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
    if (this.finalElectricity && this.finalWater) {
      this.bill.finalElectricity = this.finalElectricity;
      this.bill.finalWater = this.finalWater;
      this.bill.admin2 = this.admin2;
      this.billService.updateBill(this.billId, this.bill).subscribe({
        next: (response: void) => {
          Swal.fire(
            'Thành công',
            'Bạn đã cập nhật điện nước thành công',
            'success'
          );
          this.getAllBills();
        },
        error: (error) => {
          Swal.fire('Thất bại', 'Cập nhật điện nước thất bại', 'error');
        },
      });
    }
  }
}
