export interface ThongKeResponseDTO {
  roomType: string;
  numberOfRoomsPaid: number;
  numberOfRoomsUnpaid: number;
  totalPrice: number;
  currentPrice: number;
  listRoomsPaids: number[];
  listRoomsUnpaids: number[];
}
