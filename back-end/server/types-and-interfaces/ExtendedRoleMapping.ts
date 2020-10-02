import { RoleMapping } from "loopback";
import {
  ExtendedStaticPersistedModel,
  ExtendedPersistedModel
} from "./ExtendedPersistedModel";

export interface ExtendedRoleMapping
  extends RoleMapping,
    ExtendedPersistedModel {
  roleId: number;
  principalType: string;
  principalId: string;
}

export interface ExtendedStaticRoleMapping
  extends ExtendedStaticPersistedModel {
  USER: "USER";
}
