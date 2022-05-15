import { IEntity } from "./IEntity"
import { UniqueId } from "./UniqueId"

export interface IRepository<T extends IEntity> {
  save(entity: T): Promise<T>
  get(entityId: UniqueId): Promise<T | null>
  generateId(): UniqueId
}
