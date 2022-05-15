import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertProps,
  VStack,
  HStack,
} from "@chakra-ui/react"

type Props = AlertProps & {
  title: string
  description: string
}

export function Alert(props: Props) {
  return (
    <ChakraAlert p={4} {...props}>
      <VStack spacing={2} alignItems="start">
        <HStack spacing={0}>
          <AlertIcon />
          <AlertTitle>{props.title}</AlertTitle>
        </HStack>
        <AlertDescription>{props.description}</AlertDescription>
      </VStack>
    </ChakraAlert>
  )
}
