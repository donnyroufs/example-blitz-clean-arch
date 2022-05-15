import { List } from "app/core/components/List"
import { GetGuestbookWithEntriesResponse } from "integrations/application"
import { GuestbookEntry } from "./GuestbookEntry"

type Props = {
  // TODO" Refactor to own model
  guestbook: GetGuestbookWithEntriesResponse["guestbook"]
}

export function GuestbookList(props: Props) {
  return (
    <List
      listStyles={{
        m: 0,
      }}
      items={props.guestbook.entries}
      selectKey={(item) => item.id}
      render={(item) => <GuestbookEntry {...item} />}
    />
  )
}
