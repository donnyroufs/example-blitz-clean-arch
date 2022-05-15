import { UniqueId } from "integrations/common/UniqueId"
import { IUseCase } from "../common"
import { GUESTBOOK_ID, IGuestbookRepository } from "../domain"

import { GetGuestbookWithEntriesResponse } from "./GetGuestbookWithEntriesResponse"

export class GetGuestbookWithEntriesUseCase
  implements IUseCase<undefined, GetGuestbookWithEntriesResponse>
{
  public constructor(private readonly _guestbookRepository: IGuestbookRepository) {}

  public async execute(): Promise<GetGuestbookWithEntriesResponse> {
    const guestbook = await this._guestbookRepository.get(new UniqueId(GUESTBOOK_ID))

    return GetGuestbookWithEntriesResponse.fromDomain(guestbook!)
  }
}
