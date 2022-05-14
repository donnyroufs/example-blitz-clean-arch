import { IDomainEvent } from "./IDomainEvent"
import { IEntity } from "./IEntity"

export class AggregateRoot implements IEntity {
  public readonly id: string
  private readonly _events: IDomainEvent[] = []

  public constructor(id: string) {
    this.id = id
  }

  public getEvents() {
    return this._events
  }

  protected addEvent(event: IDomainEvent) {
    this._events.push(event)
  }
}
