// import db from "./index"

import db from "db"
import { GUESTBOOK_ID } from "integrations/domain"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await db.$reset()
  await db.guestbook.create({
    data: {
      id: GUESTBOOK_ID,
    },
  })
}

export default seed
