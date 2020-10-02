import {
  ExtendedPersistedModel,
  ExtendedStaticPersistedModel
} from "../types-and-interfaces/ExtendedPersistedModel";
import { OPERATING_MODEL, SUBSTREAM } from "common/constants/models";
import { Action } from "./action";
import app from "../server";
import ActivityController from "../classes/ActivityController";

/** Represents an operating model */
export interface OperatingModel extends ExtendedPersistedModel {
  id: number;
  name: string;

  actions(): Action[];

  getScore(isTarget?: boolean): Promise<number>;
}

/** Represents an operating model */
export interface OperatingModelModel extends ExtendedStaticPersistedModel {
  prototype: OperatingModel;
}

export default (Model: OperatingModelModel): void => {
  Model.prototype.getScore = async function(
    this: OperatingModel,
    isTarget?: boolean
  ): Promise<number> {
    switch (this.id) {
      case OPERATING_MODEL.PEOPLE.id:
        return await app.models.Substream[isTarget ? "getTarget" : "getScore"](
          SUBSTREAM.DEV_TAWAL_ORG.id,
          SUBSTREAM.DEV_TAWAL_ORG.workstreamId
        );

      case OPERATING_MODEL.PROCESSES.id: {
        const scores = await Promise.all([
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_COMMUN_PROC_TOOLS.id,
            SUBSTREAM.DEV_COMMUN_PROC_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_COMMER_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_COMMER_PROC_POL_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_FIN_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_FIN_PROC_POL_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_PROCU_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_PROCU_PROC_POL_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_SITE_LEASE_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_SITE_LEASE_PROC_POL_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_OPS_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_OPS_PROC_POL_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_NET_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_NET_PROC_POL_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_PPC_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_PPC_PROC_POL_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_TI_POL_PROC.id,
            SUBSTREAM.DEV_TI_POL_PROC.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_SG_PROC.id,
            SUBSTREAM.DEV_SG_PROC.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.DEV_HR_POL_PROC_TOOL.id,
            SUBSTREAM.DEV_HR_POL_PROC_TOOL.workstreamId
          )
        ]);
        return scores.reduce((acc, curr): number => acc + curr, 0);
      }

      case OPERATING_MODEL.TOOLS.id: {
        const scores = await Promise.all([
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.IMPL_ERP_DOMAIN_TOOLS.id,
            SUBSTREAM.IMPL_ERP_DOMAIN_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.IMPL_BSS_DOMAIN_TOOLS.id,
            SUBSTREAM.IMPL_BSS_DOMAIN_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.IMPL_OSS_DOMAIN_TOOLS.id,
            SUBSTREAM.IMPL_OSS_DOMAIN_TOOLS.workstreamId
          ),
          app.models.Substream[isTarget ? "getTarget" : "getScore"](
            SUBSTREAM.IMPL_ORG_DOMAIN_TOOLS.id,
            SUBSTREAM.IMPL_ORG_DOMAIN_TOOLS.workstreamId
          )
        ]);
        return scores.reduce((acc, curr): number => acc + curr, 0);
      }

      case OPERATING_MODEL.GOVERNANCE.id: {
        const scores = await Promise.all([
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_PROCU_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_PROCU_PROC_POL_TOOLS.workstreamId,
            "TAWAL procurement policy"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_SITE_LEASE_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_SITE_LEASE_PROC_POL_TOOLS.workstreamId,
            "Site Lease Policy"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_OPS_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_OPS_PROC_POL_TOOLS.workstreamId,
            "Develop Operations Policy"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_OPS_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_OPS_PROC_POL_TOOLS.workstreamId,
            "Develop EHS Policy"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_NET_PROC_POL_TOOLS.id,
            SUBSTREAM.DEV_NET_PROC_POL_TOOLS.workstreamId,
            "Develop Network Policies"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_TI_POL_PROC.id,
            SUBSTREAM.DEV_TI_POL_PROC.workstreamId,
            "Set up IT Governance Framework"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.SETUP_QUAL_RISK_FUNC.id,
            SUBSTREAM.SETUP_QUAL_RISK_FUNC.workstreamId,
            "Policies and Processes Development Policy"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.SETUP_QUAL_RISK_FUNC.id,
            SUBSTREAM.SETUP_QUAL_RISK_FUNC.workstreamId,
            "Develop Risk Management Framework"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_CORP_GOV.id,
            SUBSTREAM.DEV_CORP_GOV.workstreamId,
            "Authority Matrix"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_HR_POL_PROC_TOOL.id,
            SUBSTREAM.DEV_HR_POL_PROC_TOOL.workstreamId,
            "Employee Manual"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_HR_POL_PROC_TOOL.id,
            SUBSTREAM.DEV_HR_POL_PROC_TOOL.workstreamId,
            "HR Policy Development"
          )
        ]);
        return scores.reduce((acc, curr): number => acc + curr, 0);
      }

      case OPERATING_MODEL.PERFORMANCE.id: {
        const scores = await Promise.all([
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_COMMER_ORG.id,
            SUBSTREAM.DEV_COMMER_ORG.workstreamId,
            "Define the Sales Incentive Plan (SIP)"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_SALES_ACC_MAN.id,
            SUBSTREAM.DEV_SALES_ACC_MAN.workstreamId,
            "Implement Sales Incentives"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEV_TAWAL_PERF_MAN_FRAM.id,
            SUBSTREAM.DEV_TAWAL_PERF_MAN_FRAM.workstreamId,
            "Performance Management"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEF_EMPL_PERF_DEV.id,
            SUBSTREAM.DEF_EMPL_PERF_DEV.workstreamId,
            "Employee Development"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEF_EMPL_PERF_DEV.id,
            SUBSTREAM.DEF_EMPL_PERF_DEV.workstreamId,
            "Succession Plan"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEF_EMPL_PERF_DEV.id,
            SUBSTREAM.DEF_EMPL_PERF_DEV.workstreamId,
            "Performance Tools"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEF_EMPL_PERF_DEV.id,
            SUBSTREAM.DEF_EMPL_PERF_DEV.workstreamId,
            "Performance Cycle"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEF_EMPL_PERF_DEV.id,
            SUBSTREAM.DEF_EMPL_PERF_DEV.workstreamId,
            "Training"
          ),
          ActivityController[isTarget ? "target" : "score"](
            SUBSTREAM.DEF_EMPL_PERF_DEV.id,
            SUBSTREAM.DEF_EMPL_PERF_DEV.workstreamId,
            "Leadership Programme"
          )
        ]);
        return scores.reduce((acc, curr): number => acc + curr, 0);
      }

      default:
        return 0;
    }
  };
};
