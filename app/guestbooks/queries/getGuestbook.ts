import { resolver } from "blitz"
import { container } from "integrations"
import { z } from "zod"

const GetGuestbook = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetGuestbook), resolver.authorize(), ({ id }) =>
  container.getGuestbookWithEntriesUseCase.execute()
)
