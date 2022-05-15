import { GuestbookEntry } from "integrations/domain"

export class GuestbookEntryDto {
  public readonly id: string
  public readonly email: string
  public readonly content: string
  public readonly createdAt: Date

  protected constructor(id: string, email: string, content: string, createdAt: Date) {
    this.id = id
    this.email = email
    this.content = content
    this.createdAt = createdAt
  }

  public static fromDomain(entry: GuestbookEntry) {
    return new GuestbookEntryDto(
      entry.id.value,
      entry.email.value,
      entry.content.value,
      entry.createdAt
    )
  }
}
