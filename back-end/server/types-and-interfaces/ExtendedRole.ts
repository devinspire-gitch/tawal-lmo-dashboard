import { Role, RoleMapping } from "loopback";
import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "./ExtendedPersistedModel";

export interface ExtendedRole extends Role, ExtendedPersistedModel {
  id: number;
  principals: { create(roleMapping): Promise<RoleMapping> };
}

type StaticRole = typeof Role;

export interface ExtendedStaticRole
  extends StaticRole,
    ExtendedStaticPersistedModel {}
