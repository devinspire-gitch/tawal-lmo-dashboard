import { PersistedModel } from "loopback";
import { NextFunction } from "connect";

export interface ExtendedPersistedModel extends PersistedModel {
  toJSON();
}

type StaticPersistedModel = typeof PersistedModel;

export interface ExtendedStaticPersistedModel extends StaticPersistedModel {
  validate(
    field: string,
    callback: (err: () => void) => void,
    { message: string }
  ): void;

  validateAsync(
    field: string,
    callback: (err: () => void, done: () => void) => Promise<void>,
    { message: string }
  ): void;

  validatesPresenceOf(field: string): void;

  validatesNumericalityOf(field: string, { int: boolean }): void;

  observe(event: string, callback: (ctx) => void): void;

  observe(event: string, callback: (ctx, next: NextFunction) => void): void;

  once(event: string, callback: () => void): void;

  on(event: string, callback: () => void): void;
}
