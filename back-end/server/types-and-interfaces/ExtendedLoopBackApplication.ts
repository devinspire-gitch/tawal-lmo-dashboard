import { ActionModel } from "../models/action";
import { ChiefModel } from "../models/chief";
import { IssueTypeModel } from "../models/issue-type";
import { IssueModel } from "../models/issue";
import { OperatingModelModel } from "../models/operating-model";
import { ReportModel } from "../models/report";
import { SettingModel } from "../models/setting";
import { SubstreamModel } from "../models/substream";
import { UserModel } from "../models/user";
import { ValueBlockModel } from "../models/value-block";
import { WorkstreamModel } from "../models/workstream";
import { LoopBackApplication, Model, AccessToken, ACL, Role } from "loopback";
import { ExtendedStaticRoleMapping } from "./ExtendedRoleMapping";
import { Router, RequestHandler } from "express";

export type ExtendedLoopbackApplication = LoopBackApplication & {
  models: {
    AccessToken: typeof AccessToken;
    ACL: typeof ACL & {
      isMappedToRole(
        principalType: string,
        principalId: number,
        roleId: number
      ): boolean;
    };
    Role: typeof Role;
    RoleMapping: ExtendedStaticRoleMapping;
    Action: ActionModel;
    Chief: ChiefModel;
    IssueType: IssueTypeModel;
    Issue: IssueModel;
    OperatingModel: OperatingModelModel;
    Report: ReportModel;
    Setting: SettingModel;
    Substream: SubstreamModel;
    User: UserModel;
    ValueBlock: ValueBlockModel;
    Workstream: WorkstreamModel;
  };
  stop: () => void;
  loopback: {
    Router(): Router;
    status(): RequestHandler;
  };
  dataSources: {
    [name: string]: {
      host: string;
      port: string;
      database: string;
      username: string;
      password: string;
      name: string;
      debug: boolean;
      connector: string;
      isActual: (
        model: Model,
        callback: (err: Error, actual: boolean) => void
      ) => void;
      autoupdate: (model: Model, callback: (err: Error) => void) => void;
      automigrate: (callback: (err: Error) => void) => void;
      setMaxListeners: (numModels: number) => void;
    };
  };
};
