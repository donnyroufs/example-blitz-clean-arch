import { IDomainEvent } from "./IDomainEvent"
import { IEntity } from "./IEntity"
import { UniqueId } from "./UniqueId"

export class AggregateRoot implements IEntity {
  public readonly id: UniqueId
  private readonly _events: IDomainEvent[] = []

  public constructor(id: UniqueId) {
    this.id = id
  }

  public getEvents() {
    return this._events
  }

  protected addEvent(event: IDomainEvent) {
    this._events.push(event)
  }
}
