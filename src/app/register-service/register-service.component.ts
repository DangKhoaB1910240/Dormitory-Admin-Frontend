import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContractService } from '../Services/contract/contract.service';
import { ContractResponseDto } from '../Models/contract/contract-response-dto';
import { Sesmester } from '../Models/sesmester/sesmester';
import { SesmesterService } from '../Services/sesmester/sesmester.service';
import { Page } from '../Models/page/page';
import { Contract } from '../Models/contract/contract';
import { BlacklistService } from '../Services/blacklist/blacklist.service';
import Swal from 'sweetalert2';
import { AdminService } from '../Services/admin/admin.service';
import { AuthService } from '../Services/auth/auth.service';
import { Admin } from '../Models/admin/admin';
import { StudentService } from '../Services/student/student.service';
import { RegisterService } from '../Models/register-service/register-service';
import { RegisterServiceService } from '../Services/register-service/register-service.service';
@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrls: ['./register-service.component.css'],
})
export class RegisterServiceComponent implements OnInit {
  sesmesters: Sesmester[] = [];
  majors: string[] = [];
  numberStudents: string[] = [];
  registers: RegisterService[] = [];
  // Binding 2 chiều
  sesmester: number | null = null;
  schoolYear: string | null = null;
  major: string | null = null;
  numberStudent: string | null = null;
  gender: number | null = null;
  currentPage = 1;
  totalElements!: number;
  limit!: number;
  totalPrice: number = 0;
  currentPrice: number = 0;
  unpayPrice: number = 0;
  search: string = '';
  studentStatus: number = 0;
  reason: string = '';
  regiter!: RegisterService;
  admin!: Admin;
  // kết thúc Binding 2 chiều
  constructor(
    private registerService: RegisterServiceService,
    private sesmesterService: SesmesterService,
    private detect: ChangeDetectorRef,
    private blacklistService: BlacklistService,
    private adminService: AdminService,
    private authService: AuthService,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    // Gọi học kỳ
    this.sesmesterService.getAllSesmester().subscribe({
      next: (response: Sesmester[]) => {
        this.sesmesters = response;
      },
      error: (error) => {},
    });
    this.adminService
      .getAdminByNoAdmin(this.authService.getUsername())
      .subscribe({
        next: (response: Admin) => {
          this.admin = response;
        },
        error: (error) => {},
      });
    this.filterRegister();
    // Gọi API và lấy dữ liệu
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.registerService
      .getRegisterFromFilter(
        this.sesmester,
        this.schoolYear,
        this.major,
        this.numberStudent,
        this.gender,
        this.currentPage - 1,
        6
      )
      .subscribe({
        next: (response: Page<RegisterService>) => {
          this.registers = response.content;
        },
      });
  }
  filterRegisters() {
    this.totalPrice = 0;
    this.currentPrice = 0;
    this.unpayPrice = 0;
    this.registerService
      .getRegisterFromFilter(
        this.sesmester,
        this.schoolYear,
        this.major,
        this.numberStudent,
        this.gender
      )
      .subscribe({
        next: (response: Page<RegisterService>) => {
          this.registers = response.content;
          this.totalElements = response.totalElements;
          this.limit = response.size;
          this.registers.forEach((r) => {
            this.totalPrice += r.price;

            if (r.status == 1) {
              this.currentPrice += r.price;
            }
            if (r.status == 0) {
              this.unpayPrice += r.price;
            }
          });
          this.detect.detectChanges();
          this.search = '';
          if (
            this.schoolYear == null &&
            this.sesmester == null &&
            this.major == null &&
            this.numberStudent == null &&
            this.gender == null
          ) {
            // Lấy danh sách majors từ contracts và loại bỏ các giá trị trùng lặp
            this.majors = Array.from(
              new Set(this.registers.map((r) => r.student.major))
            );
            // Lấy 3 phần tử đầu từ mảng contracts.numberStudent và loại bỏ các giá trị trùng lặp
            this.numberStudents = Array.from(
              new Set(
                this.registers.map((r) => r.student.numberStudent.slice(0, 3))
              )
            );
          }
          this.detect.detectChanges();
          this.changePage(this.currentPage);
        },
        error: (error) => {},
      });
  }
  filterRegister() {
    if (this.sesmester == 0) {
      this.sesmester = null;
    }
    if (this.gender == 2) {
      this.gender = null;
    }
    if (this.schoolYear == 'all') {
      this.schoolYear = null;
    }
    if (this.major == 'all') {
      this.major = null;
    }
    if (this.numberStudent == 'all') {
      this.numberStudent = null;
    }
    this.filterRegisters();
  }
  searchFilter() {
    this.totalPrice = 0;
    this.currentPrice = 0;
    this.unpayPrice = 0;
    console.log(this.search == '');
    this.registerService.searchFilter(this.search).subscribe({
      next: (response: Page<RegisterService>) => {
        this.registers = response.content;

        this.totalElements = response.totalElements;
        this.limit = response.size;
        this.registers.forEach((r) => {
          this.totalPrice += r.price;

          if (r.status == 1) {
            this.currentPrice += r.price;
          }
          if (r.status == 0) {
            this.unpayPrice += r.price;
          }
        });
        this.sesmester = null;
        this.gender = null;
        this.schoolYear = null;
        this.major = null;
        this.numberStudent = null;
      },
      error: (error) => {},
    });
  }
}
{
}
