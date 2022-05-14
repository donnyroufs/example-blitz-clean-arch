import { cast, IUseCase } from "../common"
import {
  Guestbook,
  GuestbookEntry,
  GuestbookEntryContent,
  GuestbookEntryEmail,
  GUESTBOOK_ID,
  IGuestbookRepository,
} from "../domain"

import { CreateGuestbookEntryResponse } from "./CreateGuestbookEntryResponse"
import { ICreateGuestbookEntryRequest } from "./ICreateGuestbookEntryRequest"

export class CreateGuestbookEntryUseCase
  implements IUseCase<ICreateGuestbookEntryRequest, CreateGuestbookEntryResponse>
{
  public constructor(private readonly _guestbookRepository: IGuestbookRepository) {}

  public async execute(input: ICreateGuestbookEntryRequest): Promise<CreateGuestbookEntryResponse> {
    const data = this.mapInputToDomain(input)

    const guestbook = await this.getGuestbook()

    const entry = new GuestbookEntry(
      this._guestbookRepository.generateId(),
      data.email,
      data.content,
      new Date()
    )

    guestbook.addEntry(entry)

    await this._guestbookRepository.save(guestbook)

    return this.mapToResponse(entry)
  }

  private mapToResponse(entry: GuestbookEntry) {
    return new CreateGuestbookEntryResponse(
      entry.id,
      entry.email.value,
      entry.content.value,
      entry.createdAt
    )
  }

  private getGuestbook(): Promise<Guestbook> {
    return cast<Promise<Guestbook>>(this._guestbookRepository.get(GUESTBOOK_ID))
  }

  private mapInputToDomain(input: ICreateGuestbookEntryRequest) {
    return {
      email: new GuestbookEntryEmail(input.email),
      content: new GuestbookEntryContent(input.content),
    }
  }
}
