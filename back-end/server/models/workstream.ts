import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "../types-and-interfaces/ExtendedPersistedModel";
import { Action } from "./action";
import { Issue } from "./issue";
import { Substream } from "./substream";

/** Represents a workstream */
export interface Workstream extends ExtendedPersistedModel {
  id: number;
  name: string;
  code: string;

  substreams(): Substream[];
  actions(): Action[];
  issues(): Issue[];
}

/** Represents a workstream */
export interface WorkstreamModel extends ExtendedStaticPersistedModel {}

export default (/* Model: WorkstreamModel */): void => {};
