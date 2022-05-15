import { ListItem as ChakraListItem, ListItemProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export interface IListItem<TItem> {}

type Props = ListItemProps & {
  children: ReactNode
}

export function ListItem(props: Props) {
  return <ChakraListItem {...props}>{props.children}</ChakraListItem>
}
