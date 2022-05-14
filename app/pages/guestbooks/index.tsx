import { Suspense } from "react"
import { Head, BlitzPage, Routes, useQuery, useMutation, invalidateQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getGuestbook from "app/guestbooks/queries/getGuestbook"
import { GUESTBOOK_ID } from "integrations/domain"
import LabeledTextField from "app/core/components/LabeledTextField"
import Form from "app/core/components/Form"
import createGuestbookEntry from "app/guestbooks/mutations/createGuestbookEntry"

function Guestbook() {
  const [data] = useQuery(getGuestbook, { id: GUESTBOOK_ID })
  const [createEntry] = useMutation(createGuestbookEntry, {
    onSuccess() {
      invalidateQuery(getGuestbook)
    },
  })

  function handleSubmit(values: any) {
    createEntry(values)
  }

  return (
    <div>
      <div>
        <h1>Guestbook</h1>
        <div style={{ display: "inline-block" }}>
          {data.guestbook.entries.map((entry) => (
            <GuestbookEntry key={entry.id} {...entry} />
          ))}
        </div>
      </div>
      <div>
        <Form onSubmit={handleSubmit}>
          <LabeledTextField label="email" name="email" type="email" />
          <LabeledTextField label="content" name="content" type="text" />
          <button type="submit">Add Entry</button>
        </Form>
      </div>
    </div>
  )
}

function GuestbookEntry({ email, content }: { email: string; content: string }) {
  return (
    <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid gray" }}>
      <h4 style={{ margin: 0 }}>{email}</h4>
      <p style={{ margin: 0 }}>{content}</p>
    </div>
  )
}

const GuestbooksPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Guestbook</title>
      </Head>

      <Suspense fallback={<p>Loading...</p>}>
        <Guestbook />
      </Suspense>
    </>
  )
}

GuestbooksPage.authenticate = true
// @ts-ignore
GuestbooksPage.getLayout = (page) => <Layout>{page}</Layout>

export default GuestbooksPage
