import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContractService } from '../Services/contract/contract.service';
import { ContractResponseDto } from '../Models/contract/contract-response-dto';
import { Sesmester } from '../Models/sesmester/sesmester';
import { SesmesterService } from '../Services/sesmester/sesmester.service';
import { Page } from '../Models/page/page';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
})
export class ContractComponent implements OnInit {
  sesmesters: Sesmester[] = [];
  majors: string[] = [];
  numberStudents: string[] = [];
  contracts: ContractResponseDto[] = [];
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
  // kết thúc Binding 2 chiều
  constructor(
    private contractService: ContractService,
    private sesmesterService: SesmesterService,
    private detect: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    // Gọi học kỳ
    this.sesmesterService.getAllSesmester().subscribe({
      next: (response: Sesmester[]) => {
        this.sesmesters = response;
      },
      error: (error) => {},
    });
    this.filterContracts();
    // Gọi API và lấy dữ liệu
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.contractService
      .getContractsFromFilter(
        this.sesmester,
        this.schoolYear,
        this.major,
        this.numberStudent,
        this.gender,
        this.currentPage - 1,
        6
      )
      .subscribe({
        next: (response: Page<ContractResponseDto>) => {
          this.contracts = response.content;
        },
      });
  }
  filterContracts() {
    this.totalPrice = 0;
    this.currentPrice = 0;
    this.unpayPrice = 0;
    this.contractService
      .getContractsFromFilter(
        this.sesmester,
        this.schoolYear,
        this.major,
        this.numberStudent,
        this.gender
      )
      .subscribe({
        next: (response: Page<ContractResponseDto>) => {
          this.contracts = response.content;
          this.totalElements = response.totalElements;
          this.limit = response.size;
          this.contracts.forEach((c) => {
            if (c.status != 2) {
              this.totalPrice += c.totalPrice;
            }
            if (c.status == 1) {
              this.currentPrice += c.totalPrice;
            }
            if (c.status == 0) {
              this.unpayPrice += c.totalPrice;
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
              new Set(this.contracts.map((contract) => contract.major))
            );
            // Lấy 3 phần tử đầu từ mảng contracts.numberStudent và loại bỏ các giá trị trùng lặp
            this.numberStudents = Array.from(
              new Set(
                this.contracts.map((contract) =>
                  contract.numberStudent.slice(0, 3)
                )
              )
            );
          }
          this.detect.detectChanges();
          this.changePage(this.currentPage);
        },
        error: (error) => {},
      });
  }
  filterContract() {
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
    this.filterContracts();
  }
  searchFilter() {
    this.totalPrice = 0;
    this.currentPrice = 0;
    this.unpayPrice = 0;
    console.log(this.search == '');
    this.contractService.searchFilter(this.search).subscribe({
      next: (response: Page<ContractResponseDto>) => {
        this.contracts = response.content;

        this.totalElements = response.totalElements;
        this.limit = response.size;
        this.contracts.forEach((c) => {
          if (c.status != 2) {
            this.totalPrice += c.totalPrice;
          }
          if (c.status == 1) {
            this.currentPrice += c.totalPrice;
          }
          if (c.status == 0) {
            this.unpayPrice += c.totalPrice;
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
  updateContract() {
    console.log(this.studentStatus);
  }
}
