import { Guestbook } from "integrations/domain"
import { GuestbookDto } from "./GuestbookDto"

export class GetGuestbookWithEntriesResponse {
  public readonly guestbook: GuestbookDto

  protected constructor(guestbook: GuestbookDto) {
    this.guestbook = guestbook
  }

  public static fromDomain(guestbook: Guestbook) {
    return new GetGuestbookWithEntriesResponse(GuestbookDto.fromDomain(guestbook))
  }
}
