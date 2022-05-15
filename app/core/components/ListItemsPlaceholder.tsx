import { Stack } from "@chakra-ui/react"
import { Skeleton } from "./Skeleton"

type Props = {
  amount: number
  height: number | string
  spacing: number
}

export function ListItemsPlaceholder({ amount, ...props }: Props) {
  return (
    <Stack spacing={props.spacing}>
      {Array.from({ length: amount }).map((_, i) => (
        <Skeleton key={i} {...props} />
      ))}
    </Stack>
  )
}
