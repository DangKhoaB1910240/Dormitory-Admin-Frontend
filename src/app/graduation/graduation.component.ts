import { Component, OnInit } from '@angular/core';
import { BlacklistService } from '../Services/blacklist/blacklist.service';
import { Page } from '../Models/page/page';
import { Blacklist } from '../Models/blacklist/blacklist';
import { StudentService } from '../Services/student/student.service';
import { Student } from '../Models/student/student';

@Component({
  selector: 'app-graduation',
  templateUrl: './graduation.component.html',
  styleUrls: ['./graduation.component.css'],
})
export class GraduationComponent implements OnInit {
  constructor(private studentService: StudentService) {}
  currentPage = 1;
  totalElements!: number;
  limit!: number;
  students: Student[] = [];
  ngOnInit(): void {
    this.studentService.getStudentGratuation().subscribe({
      next: (response: Page<Student>) => {
        this.students = response.content;
        this.totalElements = response.totalElements;
        this.limit = response.size;
        console.log(response);
      },
      error: (error) => {},
    });
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.studentService
      .getStudentGratuation(this.currentPage - 1, 6)
      .subscribe({
        next: (response: Page<Student>) => {
          this.students = response.content;
        },
      });
  }
}
