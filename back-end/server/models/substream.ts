import app from "../server";
import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "../types-and-interfaces/ExtendedPersistedModel";
import ActivityController from "../classes/ActivityController";
import { Action } from "./action";
import { Issue } from "./issue";
import { Workstream } from "./workstream";

/** Represents a substream */
export interface Substream extends ExtendedPersistedModel {
  id: number;
  name: string;

  workstreamId: number;
  workstream(): Workstream;

  actions(): Action[];
  issues(): Issue[];
}

/** Represents a substream */
export interface SubstreamModel extends ExtendedStaticPersistedModel {
  getDuration(substreamId: number, workstreamId: number): Promise<number>;
  getTarget(substreamId: number, workstreamId: number): Promise<number>;
  getScore(substreamId: number, workstreamId: number): Promise<number>;
}

export default (Model: SubstreamModel): void => {
  Model.getDuration = async (
    substreamId: number,
    workstreamId: number
  ): Promise<number> => {
    const actions = await app.models.Action.find({
      where: {
        workstreamId: workstreamId,
        substreamId: substreamId
      }
    });
    return actions.reduce(
      (acc, curr): number => acc + curr.durationInDays(),
      0
    );
  };

  Model.getTarget = async (
    substreamId: number,
    workstreamId: number
  ): Promise<number> => {
    return ActivityController.weightedTarget(workstreamId, substreamId);
  };

  Model.getScore = async (
    substreamId: number,
    workstreamId: number
  ): Promise<number> => {
    return ActivityController.weightedActualScore(workstreamId, substreamId);
  };
};
