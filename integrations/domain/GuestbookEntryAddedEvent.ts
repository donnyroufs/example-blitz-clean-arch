import { IDomainEvent } from "../common"

import { GuestbookEntryEmail } from "./GuestbookEmail"
import { GuestbookEntry } from "./GuestbookEntry"
import { GuestbookEntryContent } from "./GuestbookEntryContent"

export class GuestbookEntryAddedEvent implements IDomainEvent {
  public readonly id: GuestbookEntry["id"]
  public readonly email: GuestbookEntryEmail
  public readonly content: GuestbookEntryContent
  public readonly createdAt: Date

  public constructor({ id, email, content, createdAt }: GuestbookEntry) {
    this.id = id
    this.email = email
    this.content = content
    this.createdAt = createdAt
  }
}
