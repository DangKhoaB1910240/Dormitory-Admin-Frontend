import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RoomtypeService } from '../Services/roomtype/roomtype.service';
import { RoomType } from '../Models/roomtype/room-type';
import { ImageService } from '../Services/image/image.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css'],
})
export class RoomTypeComponent implements OnInit {
  listRoomType: RoomType[] = [];
  imageUrls: string[] = [];
  imageUrl: string = '';
  selectedEnable!: number;
  showPrice: boolean = true;
  constructor(
    private roomListService: RoomtypeService,
    private imageService: ImageService,
    private detect: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getAllRoomType();
  }

  getAllRoomType(): void {
    // this.roomListService.getAllRoomType().subscribe({
    //   next: (response: any) => {
    //     this.listRoomType = response;
    //     this.listRoomType.map((roomType) => {
    //       this.imageService
    //         .getImage(roomType.images[0].name)
    //         .subscribe((response) => {
    //           this.displayImage(response.body!);
    //           this.imageUrls.push(this.imageUrl);
    //         });
    //     });
    //   },
    //   error: (error) => {
    //     if (error.status === 401) {
    //     }
    //   },
    // });
    //
    this.roomListService.getAllRoomType().subscribe({
      next: (response: any) => {
        this.listRoomType = response;

        // Create an array of observables for image requests
        const imageRequests = this.listRoomType.map((roomType) =>
          this.imageService.getImage(roomType.images[0].name)
        );

        // Use forkJoin to wait for all image requests to complete
        forkJoin(imageRequests).subscribe((responses: any[]) => {
          responses.forEach((response) => {
            this.displayImage(response.body!);
            this.imageUrls.push(this.imageUrl);
          });
        });
      },
      error: (error) => {
        if (error.status === 401) {
          // Handle 401 error
        }
      },
    });
  }
  displayImage(imageData: Blob) {
    this.imageUrl = URL.createObjectURL(imageData);
    // Sử dụng imageUrl để hiển thị ảnh trong template của bạn
  }

  changePrice() {
    this.showPrice = false;
  }
  updateEnable(r: RoomType) {
    r.enable = !r.enable;
    if (r.id)
      this.roomListService.updateRoomType(r.id, r).subscribe({
        next: (response: any) => {
          Swal.fire('Thành công', 'Bạn đã cập nhật thành công', 'success');
        },
        error: (error) => {
          Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
        },
      });
  }
}
