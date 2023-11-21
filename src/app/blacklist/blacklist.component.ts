import { Component, OnInit } from '@angular/core';
import { BlacklistService } from '../Services/blacklist/blacklist.service';
import { Page } from '../Models/page/page';
import { Blacklist } from '../Models/blacklist/blacklist';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css'],
})
export class BlacklistComponent implements OnInit {
  constructor(private blackListService: BlacklistService) {}
  currentPage = 1;
  totalElements!: number;
  limit!: number;
  blackList: Blacklist[] = [];
  ngOnInit(): void {
    this.blackListService.getAllBlackList().subscribe({
      next: (response: Page<Blacklist>) => {
        this.blackList = response.content;
        this.totalElements = response.totalElements;
        this.limit = response.size;
        console.log(response);
      },
      error: (error) => {},
    });
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.blackListService.getAllBlackList(this.currentPage - 1, 6).subscribe({
      next: (response: Page<Blacklist>) => {
        this.blackList = response.content;
      },
    });
  }
}
