import { UnorderedList as ChakraUnorderedList, ListProps, ListItemProps } from "@chakra-ui/react"
import { ListItem } from "app/core/components/ListItem"
import { ReactNode } from "react"

type Props<TItem> = {
  listStyles: Omit<ListProps, "key">
  itemStyles?: Omit<ListItemProps, "key">
  selectKey: (item: TItem) => string
  items: TItem[]
  render: (item: TItem) => ReactNode
}

export function List<TItem>({ listStyles, render, selectKey, itemStyles, ...props }: Props<TItem>) {
  return (
    <ChakraUnorderedList listStyleType="none" spacing={4} {...props} {...listStyles}>
      {props.items.map((item) => (
        <ListItem
          key={selectKey(item)}
          bgColor="gray.100"
          p={4}
          borderRadius={4}
          color="blue.800"
          {...(itemStyles ?? {})}
        >
          {render(item)}
        </ListItem>
      ))}
    </ChakraUnorderedList>
  )
}
