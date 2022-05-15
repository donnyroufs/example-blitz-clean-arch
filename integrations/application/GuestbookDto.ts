import { Guestbook } from "integrations/domain"
import { GuestbookEntryDto } from "./GuestbookEntryDto"

export class GuestbookDto {
  public readonly id: string
  public readonly entries: GuestbookEntryDto[] = []

  protected constructor(id: string, entries: GuestbookEntryDto[]) {
    this.id = id
    this.entries = entries
  }

  public static fromDomain(book: Guestbook): GuestbookDto {
    return new GuestbookDto(book.id.value, book.entries.map(GuestbookEntryDto.fromDomain))
  }
}
