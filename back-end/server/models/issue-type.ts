import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "../types-and-interfaces/ExtendedPersistedModel";
import { Issue } from "./issue";

/** Represents an issue type */
export interface IssueType extends ExtendedPersistedModel {
  id: number;
  name: string;
  code: string;

  issues(): Issue[];
}

/** Represents an issue type */
export interface IssueTypeModel extends ExtendedStaticPersistedModel {}

export default (/* Model: IssueTypeModel */): void => {};
