export class RoomReservationRequestDTO {
  constructor(
    public sesmester_id: number,
    public student_id: number,
    public room_id: number
  ) {}
}
