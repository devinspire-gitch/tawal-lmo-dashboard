import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "../types-and-interfaces/ExtendedPersistedModel";
import app from "../server";
import { IssueType } from "./issue-type";
import { Workstream } from "./workstream";
import { Substream } from "./substream";

/** Represents an issue register */
export interface Issue extends ExtendedPersistedModel {
  id: string;
  code: string;
  activity?: string;
  description: string;
  mitigationActions: string;
  responsible: string;
  dueDate: Date;
  completedDate?: Date;
  comments?: string;
  priorityId: number;
  statusId?: number;

  createdAt: Date;
  updatedAt: Date;

  typeId: number;
  type(): IssueType;

  workstreamId: number;
  workstream(): Workstream;

  substreamId: number;
  substream(): Substream;
}

/** Represents an issue register */
export interface IssueModel extends ExtendedStaticPersistedModel {
  generateCode(issue: Issue): Promise<string>;
}

export default (Model: IssueModel): void => {
  Model.observe(
    "before save",
    async (ctx): Promise<void> => {
      const contextModel: Issue = ctx.instance || ctx.data;

      if (!contextModel.code) {
        contextModel.code = await Model.generateCode(contextModel);
      }
    }
  );

  Model.generateCode = async (issue: Issue): Promise<string> => {
    if (!issue || !issue.typeId) return;

    // Fetch issue type information
    const type = await app.models.IssueType.findById<IssueType>(issue.typeId);
    if (!type) return;

    const records = await Model.count({
      code: {
        neq: null
      },
      typeId: type.id
    });

    return `${type.code}-${String(records + 1).padStart(4, "0")}`;
  };
};
