import { DomainException } from "../common"

export class DuplicateEntryException extends DomainException {
  public constructor() {
    super(`You cannot create an entry because you already have one.`)
  }
}
