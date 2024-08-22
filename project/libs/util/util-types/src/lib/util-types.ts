export interface CRUDRepository<E, I, R> {
  create(item: E): Promise<R>;
  update(id: I, passwordHash: I, data: R): Promise<R>;
  findById(id: I): Promise<R | null>;
  destroy(id: I): Promise<string[] | void | R>;
}

export const SALT_ROUNDS = 10;
