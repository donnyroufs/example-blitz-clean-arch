import { IUseCase } from "../common"
import { GUESTBOOK_ID, IGuestbookRepository } from "../domain"

import { GetGuestbookWithEntriesResponse } from "./GetGuestbookWithEntriesResponse"
import { GuestbookEntryDto } from "./GuestbookEntryDto"

export class GetGuestbookWithEntriesUseCase
  implements IUseCase<undefined, GetGuestbookWithEntriesResponse>
{
  public constructor(private readonly _guestbookRepository: IGuestbookRepository) {}

  public async execute(): Promise<GetGuestbookWithEntriesResponse> {
    const guestbook = await this._guestbookRepository.get(GUESTBOOK_ID)

    return new GetGuestbookWithEntriesResponse({
      id: guestbook!.id,
      entries: guestbook!.entries.map(
        (entry) =>
          new GuestbookEntryDto(entry.id, entry.email.value, entry.content.value, entry.createdAt)
      ),
    })
  }
}
