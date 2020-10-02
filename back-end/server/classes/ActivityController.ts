import app from "../server";
import { Action } from "../models/action";

class ActivityController {
  public static async duration(
    workstreamId: number,
    substreamId: number,
    activity?: string
  ): Promise<number> {
    const actions = await app.models.Action.find<Action>({
      where: {
        workstreamId,
        substreamId,
        activity
      }
    });
    return actions.reduce(
      (acc, curr): number => acc + curr.durationInDays(),
      0
    );
  }

  public static async weight(
    workstreamId: number,
    substreamId: number,
    activity?: string
  ): Promise<number> {
    const activityDuration = await this.duration(
      workstreamId,
      substreamId,
      activity
    );
    const substreamDuration = await app.models.Substream.getDuration(
      substreamId,
      workstreamId
    );
    return activityDuration / substreamDuration;
  }

  public static async score(
    workstreamId: number,
    substreamId: number,
    activity?: string
  ): Promise<number> {
    const actions = await app.models.Action.find<Action>({
      where: {
        workstreamId,
        substreamId,
        activity
      }
    });
    let score = 0;
    for (let i = 0; i < actions.length; i++) {
      score += await actions[i].weightedActualProgress();
    }
    return score;
  }

  public static async target(
    workstreamId: number,
    substreamId: number,
    activity?: string
  ): Promise<number> {
    const actions = await app.models.Action.find<Action>({
      where: {
        workstreamId,
        substreamId,
        activity
      }
    });
    let target = 0;
    for (let i = 0; i < actions.length; i++) {
      target += await actions[i].weightedTarget();
    }
    return target;
  }

  public static async weightedActualScore(
    workstreamId: number,
    substreamId: number,
    activity?: string
  ): Promise<number> {
    const score = await this.score(workstreamId, substreamId, activity);
    const weight = await this.weight(workstreamId, substreamId, activity);
    return score * weight;
  }

  public static async weightedTarget(
    workstreamId: number,
    substreamId: number,
    activity?: string
  ): Promise<number> {
    const target = await this.target(workstreamId, substreamId, activity);
    const weight = await this.weight(workstreamId, substreamId, activity);
    return target * weight;
  }
}

export default ActivityController;
