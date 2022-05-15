import { z } from "zod"

import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"

export function GuestbookForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField label="email" name="email" type="email" />
      <LabeledTextField label="content" name="content" type="text" />
    </Form>
  )
}
