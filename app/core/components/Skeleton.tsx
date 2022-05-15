import { Skeleton as ChakraSkeleton, SkeletonProps } from "@chakra-ui/react"

type Props = SkeletonProps

export function Skeleton(props: Props) {
  return <ChakraSkeleton {...props} />
}
