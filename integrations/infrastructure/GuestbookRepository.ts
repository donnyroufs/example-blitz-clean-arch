import db, { Guestbook as PrismaGuestbook, GuestbookEntries as PrismaGuestbookEntries } from "db"

import { UniqueId } from "integrations/common/UniqueId"
import {
  Guestbook,
  GuestbookEntryAddedEvent,
  GuestbookEntryContent,
  GuestbookEntryEmail,
  IGuestbookRepository,
} from "integrations/domain"

import { AbstractRepository } from "./AbstractRepository"

export class GuestbookRepository
  extends AbstractRepository<Guestbook>
  implements IGuestbookRepository
{
  public async save(entity: Guestbook): Promise<Guestbook> {
    const query = entity
      .getEvents()
      .filter((evt) => evt instanceof GuestbookEntryAddedEvent)
      .map((evt: GuestbookEntryAddedEvent) => this.onEntryAddedEvent(evt, entity))

    await db.$transaction(query)

    return entity
  }

  public async get(entityId: UniqueId): Promise<Guestbook | null> {
    const guestbook = await db.guestbook.findFirst({
      where: {
        id: entityId.value.value,
      },
      include: {
        entries: true,
      },
    })

    if (!guestbook) return null

    return this.mapToDomain(guestbook as any)
  }

  private mapToDomain(guestbook: PrismaGuestbook & { entries: PrismaGuestbookEntries[] }) {
    return new Guestbook(
      new UniqueId(guestbook.id),
      guestbook.entries.map((entry) => ({
        content: new GuestbookEntryContent(entry.content),
        createdAt: entry.createdAt,
        email: new GuestbookEntryEmail(entry.email),
        id: new UniqueId(entry.id),
      }))
    )
  }

  private onEntryAddedEvent(evt: GuestbookEntryAddedEvent, entity: Guestbook) {
    return db.guestbookEntries.create({
      data: {
        id: evt.id.value,
        content: evt.content.value,
        email: evt.email.value,
        createdAt: evt.createdAt,
        guestbookId: entity.id.value,
      },
    })
  }
}
