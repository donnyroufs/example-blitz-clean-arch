import { GuestbookDto } from "./GuestbookDto"

export class GetGuestbookWithEntriesResponse {
  public readonly guestbook: GuestbookDto

  public constructor(guestbook: GuestbookDto) {
    this.guestbook = guestbook
  }
}
