import { resolver } from "blitz"

import { container } from "integrations"

import { CreateGuestbookEntry } from "../validations"

export default resolver.pipe(resolver.zod(CreateGuestbookEntry), resolver.authorize(), (input) =>
  container.createGuestbookUseCase.execute(input)
)
