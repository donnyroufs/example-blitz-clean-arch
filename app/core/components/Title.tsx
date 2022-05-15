import { Heading, HeadingProps } from "@chakra-ui/react"

type Props = HeadingProps & {
  content: string
}

export function Title({ content, ...props }: Props) {
  return (
    <Heading as="h1" {...props}>
      {content}
    </Heading>
  )
}
