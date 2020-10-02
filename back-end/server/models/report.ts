import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "../types-and-interfaces/ExtendedPersistedModel";
import app from "../server";
import { OperatingModel } from "./operating-model";

/** Controls reports */
export interface Report extends ExtendedPersistedModel {}

/** Controls reports */
export interface ReportModel extends ExtendedStaticPersistedModel {
  operatingModelChartData(): Promise<{
    labels: string[];
    dataset: { label: string; values: number[] }[];
  }>;
}

export default (Model: ReportModel): void => {
  Model.operatingModelChartData = async (): Promise<{
    labels: string[];
    dataset: { label: string; values: number[] }[];
  }> => {
    const operatingModels = await app.models.OperatingModel.find<
      OperatingModel
    >();
    const labels = operatingModels.map(item => item.name);
    const dataset = [];

    // Actual
    dataset.push({
      label: "Actual",
      values: await Promise.all(operatingModels.map(model => model.getScore()))
    });

    // Current Target
    dataset.push({
      label: "Current Target",
      values: await Promise.all(
        operatingModels.map(model => model.getScore(true))
      )
    });

    // Final Target
    dataset.push({
      label: "Final Target",
      values: labels.map(() => 1)
    });

    return {
      labels,
      dataset
    };
  };
};
