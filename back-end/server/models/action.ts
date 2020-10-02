import moment from "moment";
import { ACTION_STATUS } from "common/constants";
import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "../types-and-interfaces/ExtendedPersistedModel";
import app from "../server";
import ActivityController from "../classes/ActivityController";
import { OperatingModel } from "./operating-model";
import { ValueBlock } from "./value-block";
import { Chief } from "./chief";
import { Workstream } from "./workstream";
import { Substream } from "./substream";

/** Represents a detailed action register */
export interface Action extends ExtendedPersistedModel {
  id: string;
  code: string;
  deliverable?: string;
  personResponsible?: string;
  predecessor?: string;
  successor?: string;
  action: string;
  actionActualProgress: number;
  actionStartDate?: Date;
  baselineEndDate?: Date;
  updatedEndDate?: Date;
  actualStartDate?: Date;
  actionRealizationDate?: Date;
  risksAndIssues?: string;
  comments?: string;

  createdAt: Date;
  updatedAt: Date;

  operatingModelId: number;
  operatingModel(): OperatingModel;

  chiefId: number;
  chief(): Chief;

  workstreamId: number;
  workstream(): Workstream;

  substreamId: number;
  substream(): Substream;

  valueBlocks(): ValueBlock[];

  activity: string;

  // Prototype methods
  status(): {
    id: number;
    name: string;
  };
  durationInDays(): number;
  target(): number;
  weight(): Promise<number>;
  weightedTarget(): Promise<number>;
  weightedActualProgress(): Promise<number>;
}

/** Represents a detailed action register */
export interface ActionModel extends ExtendedStaticPersistedModel {
  prototype: Action;
  generateCode(action: Action): Promise<string>;
  updateValueBlocks(actionId: string, valueBlockIds: number[]): Promise<void>;
}

export default (Model: ActionModel): void => {
  Model.observe(
    "before save",
    async (ctx): Promise<void> => {
      const contextModel: Action = ctx.instance || ctx.data;

      if (!contextModel.code) {
        contextModel.code = await Model.generateCode(contextModel);
      }

      const { valueBlockIds }: { valueBlockIds: number[] } =
        ctx.instance || ctx.data;
      ctx.hookState.valueBlockIds = valueBlockIds;
    }
  );

  Model.observe(
    "after save",
    async (ctx): Promise<void> => {
      const contextModel: Action = ctx.instance || ctx.data;

      if (ctx.hookState.valueBlockIds) {
        Model.updateValueBlocks(contextModel.id, ctx.hookState.valueBlockIds);
      }
    }
  );

  Model.generateCode = async (action: Action): Promise<string> => {
    if (!action || !action.chiefId || !action.workstreamId) return;

    // Fetch action's chief and workstream information
    const chief = await app.models.Chief.findById<Chief>(action.chiefId);
    const workstream = await app.models.Workstream.findById<Workstream>(
      action.workstreamId
    );
    if (!chief || !workstream) return;

    const records = await Model.count({
      code: {
        neq: null
      },
      chiefId: chief.id,
      workstreamId: workstream.id
    });

    return `${chief.code}-${workstream.code}-${String(records + 1).padStart(
      3,
      "0"
    )}0`;
  };

  Model.updateValueBlocks = async (
    actionId: string,
    valueBlockIds: number[]
  ): Promise<void> => {
    if (!actionId || !valueBlockIds) return;

    const action = await Model.findById(actionId, { include: "valueBlocks" });
    const valueBlocks = action.valueBlocks();

    const existingValueBlocksIds: number[] = valueBlocks.map(
      (item: ValueBlock) => item.id
    );

    const valuesToAdd = valueBlockIds.filter(
      item => !existingValueBlocksIds.includes(item)
    );
    const valuesToRemove = existingValueBlocksIds.filter(
      item => !valueBlockIds.includes(item)
    );

    valuesToAdd.forEach(item => action.valueBlocks.add(item));
    valuesToRemove.forEach(item => action.valueBlocks.remove(item));
  };

  Model.prototype.status = function(
    this: Action
  ): { id: number; name: string } {
    if (!this.actualStartDate) {
      if (moment(this.actionStartDate).isBefore(moment())) {
        return ACTION_STATUS.DELAYED_START;
      }
      return ACTION_STATUS.NOT_STARTED;
    }
    if (!this.actionRealizationDate) {
      if (
        moment(this.updatedEndDate || this.baselineEndDate).isBefore(moment())
      ) {
        return ACTION_STATUS.DELAYED;
      }
      if (this.risksAndIssues) {
        return ACTION_STATUS.ON_GOING_WITH_RISKS;
      }
      return ACTION_STATUS.ON_GOING;
    }
    return ACTION_STATUS.COMPLETED;
  };

  Model.prototype.durationInDays = function(this: Action): number {
    const endDate = moment(this.updatedEndDate || this.baselineEndDate);
    const startDate = moment(this.actionStartDate);
    return endDate.diff(startDate, "days");
  };

  Model.prototype.target = function(this: Action): number {
    const startDate = moment(this.actionStartDate);
    const daysPassed = moment().diff(startDate, "days") + 1;
    const target = daysPassed / this.durationInDays();
    return Math.max(Math.min(target, 0), 1);
  };

  Model.prototype.weight = async function(this: Action): Promise<number> {
    const activityDuration = await ActivityController.duration(
      this.workstreamId,
      this.substreamId,
      this.activity
    );
    return this.durationInDays() / activityDuration;
  };

  Model.prototype.weightedTarget = async function(
    this: Action
  ): Promise<number> {
    return this.target() * (await this.weight());
  };

  Model.prototype.weightedActualProgress = async function(
    this: Action
  ): Promise<number> {
    return this.actionActualProgress * (await this.weight());
  };
};
