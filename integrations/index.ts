import "reflect-metadata"

import { IGuestbookRepository } from "./domain"
import { CreateGuestbookEntryUseCase, GetGuestbookWithEntriesUseCase } from "./application"
import { GuestbookRepository } from "./infrastructure/GuestbookRepository"

function createContainer() {
  const guestbookRepository: IGuestbookRepository = new GuestbookRepository()
  const getGuestbookWithEntriesUseCase = new GetGuestbookWithEntriesUseCase(guestbookRepository)
  const createGuestbookUseCase = new CreateGuestbookEntryUseCase(guestbookRepository)

  return {
    getGuestbookWithEntriesUseCase,
    createGuestbookUseCase,
  }
}

export const container = createContainer()
