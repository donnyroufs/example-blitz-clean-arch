import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Text, Link as ChakraLink, HStack, Center, Button, VStack } from "@chakra-ui/react"
import { Title } from "app/core/components/Title"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <VStack mt={4} spacing={2} flexDir="column">
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
      </VStack>
    )
  } else {
    return (
      <HStack spacing={4} mt={4}>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </HStack>
    )
  }
}

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Center flexFlow="column nowrap" h="100vh">
      <Title content="CA Example in Blitz" />
      {currentUser && (
        <ChakraLink as={Link} href={Routes.GuestbooksPage().pathname}>
          <Text color="blue.500" cursor="pointer" textDecor="underline">
            Go to Guestbook
          </Text>
        </ChakraLink>
      )}
      <UserInfo />
    </Center>
  )
}

Home.suppressFirstRenderFlicker = true
// @ts-ignore
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
