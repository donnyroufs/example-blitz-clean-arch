import { useQuery, useMutation, invalidateQuery } from "blitz"
import { VStack, Box, Divider } from "@chakra-ui/react"
import { FormApi, FORM_ERROR } from "final-form"

import { GUESTBOOK_ID } from "integrations/domain"

import { GuestbookForm } from "app/guestbooks/components/GuestbookForm"
import { GuestbookList } from "app/guestbooks/components/GuestbookList"
import getGuestbook from "app/guestbooks/queries/getGuestbook"
import { CreateGuestbookEntry, CreateGuestbookEntryDto } from "app/guestbooks/validations"
import createGuestbookEntry from "app/guestbooks/mutations/createGuestbookEntry"

import { ListItemsPlaceholder } from "app/core/components/ListItemsPlaceholder"
import { Title } from "app/core/components/Title"

export function Guestbook() {
  const [data, { isFetching }] = useQuery(
    getGuestbook,
    { id: GUESTBOOK_ID },
    {
      refetchOnWindowFocus: false,
    }
  )
  const [createEntry] = useMutation(createGuestbookEntry, {
    onSuccess() {
      invalidateQuery(getGuestbook)
    },
  })

  async function handleSubmit(
    values: CreateGuestbookEntryDto,
    form: FormApi<CreateGuestbookEntryDto>
  ) {
    try {
      await createEntry(values)
      form.restart()
    } catch (err) {
      return {
        [FORM_ERROR]: err.message,
      }
    }
  }

  return (
    <VStack spacing={4}>
      <VStack spacing={4} w="full" alignItems="start">
        <Title content="Guestbook" mb={4} />
        <Box w="full">
          {isFetching && <ListItemsPlaceholder height="90px" spacing={4} amount={4} />}
          {!isFetching && <GuestbookList guestbook={data.guestbook} />}
        </Box>
      </VStack>
      <Divider py={2} />
      <Box w="full">
        <GuestbookForm onSubmit={handleSubmit} submitText="Save" schema={CreateGuestbookEntry} />
      </Box>
    </VStack>
  )
}
