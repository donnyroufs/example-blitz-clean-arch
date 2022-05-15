import { z } from "zod"

export const CreateGuestbookEntry = z.object({
  email: z.string().email(),
  content: z.string().min(3),
})

export type CreateGuestbookEntryDto = z.infer<typeof CreateGuestbookEntry>
