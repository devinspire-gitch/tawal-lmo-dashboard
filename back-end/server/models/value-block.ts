import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "../types-and-interfaces/ExtendedPersistedModel";
import { Action } from "./action";

/** Represents a value block */
export interface ValueBlock extends ExtendedPersistedModel {
  id: number;
  name: string;

  actions(): Action[];
}

/** Represents a value block */
export interface ValueBlockModel extends ExtendedStaticPersistedModel {}

export default (/* Model: ValueBlockModel */): void => {};
