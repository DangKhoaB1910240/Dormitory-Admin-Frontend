import { Component, OnInit } from '@angular/core';
import { RoomtypeService } from '../Services/roomtype/roomtype.service';
import { RoomType } from '../Models/roomtype/room-type';
import { ImageService } from '../Services/image/image.service';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css'],
})
export class RoomTypeComponent implements OnInit {
  listRoomType: RoomType[] = [];
  imageUrls: string[] = [];
  imageUrl: string = '';
  constructor(
    private roomListService: RoomtypeService,
    private imageService: ImageService
  ) {}
  ngOnInit(): void {
    this.getAllRoomType();
  }

  getAllRoomType(): void {
    this.roomListService.getAllRoomType().subscribe({
      next: (response: any) => {
        this.listRoomType = response;
        this.listRoomType.map((roomType) => {
          this.imageService
            .getImage(roomType.images[0].name)
            .subscribe((response) => {
              this.imageUrls.push(this.imageUrl);
              this.displayImage(response.body!);
            });
        });
      },
      error: (error) => {
        if (error.status === 401) {
        }
      },
    });
  }
  displayImage(imageData: Blob) {
    this.imageUrl = URL.createObjectURL(imageData);
    // Sử dụng imageUrl để hiển thị ảnh trong template của bạn
  }
}
