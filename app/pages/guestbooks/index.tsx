import { Suspense } from "react"
import { Head, BlitzPage } from "blitz"
import { Container, Spinner } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import { Guestbook } from "app/guestbooks/components/Guestbook"

const GuestbooksPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Guestbook</title>
      </Head>

      <Suspense fallback={<Spinner />}>
        <Container size="container.2xl">
          <Guestbook />
        </Container>
      </Suspense>
    </>
  )
}

GuestbooksPage.authenticate = true
// @ts-ignore
GuestbooksPage.getLayout = (page) => <Layout>{page}</Layout>

export default GuestbooksPage
