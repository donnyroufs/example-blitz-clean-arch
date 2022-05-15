import { AggregateRoot } from "../common"

import { DuplicateEntryException } from "./DuplicateEntryException"
import { GuestbookEntryEmail } from "./GuestbookEmail"
import { GuestbookEntry } from "./GuestbookEntry"
import { GuestbookEntryAddedEvent } from "./GuestbookEntryAddedEvent"

export class Guestbook extends AggregateRoot {
  public readonly entries: GuestbookEntry[] = []

  public constructor(id: string)
  public constructor(id: string, entries: GuestbookEntry[])
  public constructor(id: string, entries: GuestbookEntry[] = []) {
    super(id)

    this.entries = entries
  }

  public addEntry(entry: GuestbookEntry) {
    this.throwWhenDuplicateEntry(entry.email)

    this.entries.push(entry)
    this.addEvent(new GuestbookEntryAddedEvent(entry))
  }

  private throwWhenDuplicateEntry(email: GuestbookEntryEmail) {
    const isDuplicate = this.entries.some((entry) => entry.email.equals(email))

    if (!isDuplicate) return

    throw new DuplicateEntryException()
  }
}
