import { v4 } from "uuid"

import { IEntity, IRepository } from "integrations/common"
import { UniqueId } from "integrations/common/UniqueId"

export abstract class AbstractRepository<TEntity extends IEntity> implements IRepository<TEntity> {
  public abstract save(entity: TEntity): Promise<TEntity>
  public abstract get(entityId: TEntity["id"]): Promise<TEntity | null>

  public generateId(): UniqueId {
    return new UniqueId(v4())
  }
}
