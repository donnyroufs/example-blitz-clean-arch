import { resolver } from "blitz"
import { z } from "zod"

import { container } from "integrations"

const CreateGuestbookEntry = z.object({
  email: z.string().email(),
  content: z.string(),
})

export default resolver.pipe(resolver.zod(CreateGuestbookEntry), resolver.authorize(), (input) =>
  container.createGuestbookUseCase.execute(input)
)
