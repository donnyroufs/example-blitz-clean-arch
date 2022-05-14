import { GuestbookEntryDto } from "./GuestbookEntryDto"

export class GuestbookDto {
  public readonly id: string
  public readonly entries: GuestbookEntryDto[] = []

  public constructor(id: string, entries: GuestbookEntryDto[]) {
    this.id = id
    this.entries = entries
  }
}
