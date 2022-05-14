import { IEntity } from "./IEntity"

export interface IRepository<T extends IEntity> {
  save(entity: T): Promise<T>
  get(entityId: T["id"]): Promise<T | null>
  generateId(): string
}
