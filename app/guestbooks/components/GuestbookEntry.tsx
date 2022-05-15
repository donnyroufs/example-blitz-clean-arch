import { VStack, Text } from "@chakra-ui/react"

type Props = {
  email: string
  content: string
}

export function GuestbookEntry({ email, content }: Props) {
  return (
    <VStack spacing={1} textAlign="left">
      <Text as="h3" w="full" fontWeight="bold" fontSize="lg">
        {email}
      </Text>
      <Text w="full">{content}</Text>
    </VStack>
  )
}
