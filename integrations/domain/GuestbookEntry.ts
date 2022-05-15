import { UniqueId } from "integrations/common/UniqueId"
import { IEntity } from "../common"

import { GuestbookEntryEmail } from "./GuestbookEmail"
import { GuestbookEntryContent } from "./GuestbookEntryContent"

export class GuestbookEntry implements IEntity {
  public readonly id: UniqueId
  public readonly email: GuestbookEntryEmail
  public readonly content: GuestbookEntryContent
  public readonly createdAt: Date

  constructor(
    id: UniqueId,
    email: GuestbookEntryEmail,
    content: GuestbookEntryContent,
    createdAt: Date
  ) {
    this.id = id
    this.email = email
    this.content = content
    this.createdAt = createdAt
  }
}
