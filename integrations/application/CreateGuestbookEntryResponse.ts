import { GuestbookEntry } from "integrations/domain"
import { GuestbookDto } from "./GuestbookDto"
import { GuestbookEntryDto } from "./GuestbookEntryDto"

export class CreateGuestbookEntryResponse {
  public readonly id!: string
  public readonly email!: string
  public readonly content!: string
  public readonly createdAt!: Date

  protected constructor(entry: GuestbookEntryDto) {
    Object.assign(this, entry)
  }

  public static fromDomain(entry: GuestbookEntry) {
    return new CreateGuestbookEntryResponse(GuestbookEntryDto.fromDomain(entry))
  }
}
