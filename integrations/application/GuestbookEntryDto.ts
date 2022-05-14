export class GuestbookEntryDto {
  public readonly id: string
  public readonly email: string
  public readonly content: string
  public readonly createdAt: Date

  constructor(id: string, email: string, content: string, createdAt: Date) {
    this.id = id
    this.email = email
    this.content = content
    this.createdAt = createdAt
  }
}
