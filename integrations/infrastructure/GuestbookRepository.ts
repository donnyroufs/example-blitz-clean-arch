import { v4 } from "uuid"
import db, { Guestbook as PrismaGuestbook, GuestbookEntries as PrismaGuestbookEntries } from "db"

import {
  Guestbook,
  GuestbookEntryAddedEvent,
  GuestbookEntryContent,
  GuestbookEntryEmail,
  IGuestbookRepository,
} from "integrations/domain"

export class GuestbookRepository implements IGuestbookRepository {
  public async save(entity: Guestbook): Promise<Guestbook> {
    const query = entity
      .getEvents()
      .filter((evt) => evt instanceof GuestbookEntryAddedEvent)
      .map((evt: GuestbookEntryAddedEvent) => this.onEntryAddedEvent(evt, entity))

    await db.$transaction(query)

    return entity
  }

  public async get(entityId: string): Promise<Guestbook | null> {
    const guestbook = await db.guestbook.findFirst({
      where: {
        id: entityId,
      },
      include: {
        entries: true,
      },
    })

    if (!guestbook) return null

    return this.mapToDomain(guestbook as any)
  }

  generateId(): string {
    return v4()
  }

  private mapToDomain(guestbook: PrismaGuestbook & { entries: PrismaGuestbookEntries[] }) {
    return new Guestbook(
      guestbook.id,
      guestbook.entries.map((entry) => ({
        content: new GuestbookEntryContent(entry.content),
        createdAt: entry.createdAt,
        email: new GuestbookEntryEmail(entry.email),
        id: entry.id,
      }))
    )
  }

  private onEntryAddedEvent(evt: GuestbookEntryAddedEvent, entity: Guestbook) {
    return db.guestbookEntries.create({
      data: {
        id: evt.id,
        content: evt.content.value,
        email: evt.email.value,
        createdAt: evt.createdAt,
        guestbookId: entity.id,
      },
    })
  }
}
