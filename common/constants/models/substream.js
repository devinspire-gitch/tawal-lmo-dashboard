import { WORKSTREAM } from "./workstream";

export const SUBSTREAM = {
  DEV_COMMUN_ORG: {
    id: 1,
    workstreamId: WORKSTREAM.COMMUNICATIONS.id,
    name: "Develop Communications Organization"
  },
  DEV_COMMUN_PROC_TOOLS: {
    id: 2,
    workstreamId: WORKSTREAM.COMMUNICATIONS.id,
    name: "Develop Communications Processes and tools"
  },
  DEV_COMMUN_STRAT: {
    id: 3,
    workstreamId: WORKSTREAM.COMMUNICATIONS.id,
    name: "Develop Communication Strategy"
  },
  DEV_COMMER_ORG: {
    id: 4,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Develop Commercial Organization"
  },
  TAKE_CONTR_EXIS_BUSINESS: {
    id: 5,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Take Control of Existing Business"
  },
  SETUP_TEMP_BILL_INV_RESP: {
    id: 6,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Set up Temp Billing/ Invoicing & Responsibility"
  },
  PROD_PORTIF_DEV: {
    id: 7,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Product Portfolio Development"
  },
  DEV_COMMER_STRAT: {
    id: 8,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Develop Commercial Strategy"
  },
  DEV_SALES_ACC_MAN: {
    id: 9,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Develop Sales & Account Management"
  },
  STRAT_MARK: {
    id: 10,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Strategic Marketing"
  },
  DET_CUSTOMER_XP: {
    id: 11,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Detail Customer Experience"
  },
  DEV_COMMER_PROC_POL_TOOLS: {
    id: 12,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Develop Commercial Processes, Policies, Tools"
  },
  INIT_BUSINESS_DEV: {
    id: 13,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Initiate Business Development"
  },
  IMPL_EFFENC: {
    id: 14,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Implement Efficiencies"
  },
  SETUP_DEMAND_MAN: {
    id: 15,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Set-up Demand Management"
  },
  SETUP_BID_MAN: {
    id: 16,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Set-up Bid Management"
  },
  DEV_COMMER_MON_REP: {
    id: 17,
    workstreamId: WORKSTREAM.COMMERCIAL.id,
    name: "Develop Commercial Monitoring & Reporting"
  },
  DEV_FIN_ORG: {
    id: 18,
    workstreamId: WORKSTREAM.FINANCE.id,
    name: "Develop Finance Organization"
  },
  DEV_FIN_PROC_POL_TOOLS: {
    id: 19,
    workstreamId: WORKSTREAM.FINANCE.id,
    name: "Develop Finance Processes, Policies, Tools"
  },
  DEV_FIN_MON_REP: {
    id: 20,
    workstreamId: WORKSTREAM.FINANCE.id,
    name: "Develop Financial Monitoring and Reporting"
  },
  MAN_FIXED_ASSETS: {
    id: 21,
    workstreamId: WORKSTREAM.FINANCE.id,
    name: "Manage Fixed Assets"
  },
  BUDGET_CYCLE: {
    id: 22,
    workstreamId: WORKSTREAM.FINANCE.id,
    name: "Budget Cycle"
  },
  DEV_PROCU_PROC_POL_TOOLS: {
    id: 23,
    workstreamId: WORKSTREAM.PROCUREMENT.id,
    name: "Develop Procurement Processes, Policies, Tools"
  },
  DEV_PROCU_MON_REP: {
    id: 24,
    workstreamId: WORKSTREAM.PROCUREMENT.id,
    name: "Develop Procurement Monitoring and Reporting"
  },
  DEV_PROCU_ORG: {
    id: 25,
    workstreamId: WORKSTREAM.PROCUREMENT.id,
    name: "Develop Procurement Organization"
  },
  DEV_IMPL_EFF_STRAT_PROC: {
    id: 26,
    workstreamId: WORKSTREAM.PROCUREMENT.id,
    name: "Develop and Implement Efficiency Strategy - Proc"
  },
  TAWAL_BUILDING: {
    id: 27,
    workstreamId: WORKSTREAM.PROCUREMENT.id,
    name: "TAWAL Building"
  },
  DEV_SITE_LEASE_MAN_ORG: {
    id: 28,
    workstreamId: WORKSTREAM.SITE_LEASE_MANAGEMENT.id,
    name: "Develop Site Lease Management Organization"
  },
  DEV_SITE_LEASE_PROC_POL_TOOLS: {
    id: 29,
    workstreamId: WORKSTREAM.SITE_LEASE_MANAGEMENT.id,
    name: "Develop Site Lease Processes, Policies, Tools"
  },
  DEV_SITE_LEASE_MON_REP: {
    id: 30,
    workstreamId: WORKSTREAM.SITE_LEASE_MANAGEMENT.id,
    name: "Develop Site Lease Monitoring and Reporting"
  },
  DEV_SITE_LEASE_STRAT: {
    id: 31,
    workstreamId: WORKSTREAM.SITE_LEASE_MANAGEMENT.id,
    name: "Develop Site Lease Strategy"
  },
  DEV_OPS_ORG: {
    id: 32,
    workstreamId: WORKSTREAM.OPERATIONS.id,
    name: "Develop Operations Organization"
  },
  DEV_OPS_MON_REP: {
    id: 33,
    workstreamId: WORKSTREAM.OPERATIONS.id,
    name: "Develop Operations Monitoring and Reporting"
  },
  DEV_OPS_PROC_POL_TOOLS: {
    id: 34,
    workstreamId: WORKSTREAM.OPERATIONS.id,
    name: "Develop Operations Processes, Policies, Tools"
  },
  RENEW_MAN_SERV_PARTN: {
    id: 35,
    workstreamId: WORKSTREAM.OPERATIONS.id,
    name: "Renew Managed services partnerships"
  },
  DEV_IMPL_EFF_STRAT_OPS: {
    id: 36,
    workstreamId: WORKSTREAM.OPERATIONS.id,
    name: "Develop and Implement Efficiency Strategy - Ops"
  },
  DEV_NET_ORG: {
    id: 37,
    workstreamId: WORKSTREAM.NETWORK.id,
    name: "Develop Network Organization"
  },
  DEV_NET_PROC_POL_TOOLS: {
    id: 38,
    workstreamId: WORKSTREAM.NETWORK.id,
    name: "Develop Network Processes, Policies, Tools"
  },
  DEV_IMPL_EFF_STRAT_NW: {
    id: 39,
    workstreamId: WORKSTREAM.NETWORK.id,
    name: "Develop and Implement Efficiency Strategy - NW"
  },
  CONDUCT_TECH_FIN_DUE_DEL: {
    id: 40,
    workstreamId: WORKSTREAM.NETWORK.id,
    name: "Conduct Technical and Financial Due Deligence"
  },
  BUILD_WAREH_CAP: {
    id: 41,
    workstreamId: WORKSTREAM.NETWORK.id,
    name: "Build Warehousing capabilities"
  },
  DEV_PPC_ORG: {
    id: 42,
    workstreamId: WORKSTREAM.PPC.id,
    name: "Develop PPC Organization"
  },
  DEV_PPC_PROC_POL_TOOLS: {
    id: 43,
    workstreamId: WORKSTREAM.PPC.id,
    name: "Develop PPC Processes, Policies, Tools"
  },
  DEV_PPC_MON_REP: {
    id: 44,
    workstreamId: WORKSTREAM.PPC.id,
    name: "Develop PPC Monitoring and Reporting"
  },
  DEV_IMPL_EFF_STRAT_PPC: {
    id: 35,
    work4treamId: WORKSTREAM.PPC.id,
    name: "Develop and Implement Efficiency Strategy - PPC"
  },
  BUILD_TAWAL_PPC_CAP: {
    id: 46,
    workstreamId: WORKSTREAM.PPC.id,
    name: "Build Tawal PPC capabilities"
  },
  DEV_IMPL_EFF_INNOV_STRAT: {
    id: 47,
    workstreamId: WORKSTREAM.TECHNOLOGY_AND_INNOVATION.id,
    name: "Develop and Implement Innovation Strategy"
  },
  DEV_IT_STRAT: {
    id: 48,
    workstreamId: WORKSTREAM.TECHNOLOGY_AND_INNOVATION.id,
    name: "Develop IT Strategy"
  },
  DEV_TI_ORG: {
    id: 49,
    workstreamId: WORKSTREAM.TECHNOLOGY_AND_INNOVATION.id,
    name: "Develop T&I Organization"
  },
  DEV_TI_POL_PROC: {
    id: 50,
    workstreamId: WORKSTREAM.TECHNOLOGY_AND_INNOVATION.id,
    name: "Develop T&I Policies & Processes"
  },
  IMPL_ERP_DOMAIN_TOOLS: {
    id: 51,
    workstreamId: WORKSTREAM.TECHNOLOGY_AND_INNOVATION.id,
    name: "Implement ERP Domain Tools"
  },
  IMPL_BSS_DOMAIN_TOOLS: {
    id: 52,
    workstreamId: WORKSTREAM.TECHNOLOGY_AND_INNOVATION.id,
    name: "Implement BSS Domain Tools"
  },
  IMPL_OSS_DOMAIN_TOOLS: {
    id: 53,
    workstreamId: WORKSTREAM.TECHNOLOGY_AND_INNOVATION.id,
    name: "Implement OSS Domain Tools"
  },
  IMPL_ORG_DOMAIN_TOOLS: {
    id: 54,
    workstreamId: WORKSTREAM.TECHNOLOGY_AND_INNOVATION.id,
    name: "Implement Organization Domain Tools"
  },
  DEV_MON_TAWAL_CORP_STRAT: {
    id: 55,
    work4treamId: WORKSTREAM.STRATEGY_AND_GOVERNANCE.id,
    name: "Develop and Monitor Tawal's Corporate Strategy"
  },
  DEV_TAWAL_PERF_MAN_FRAM: {
    id: 56,
    workstreamId: WORKSTREAM.STRATEGY_AND_GOVERNANCE.id,
    name: "Develop Tawal Performance Management Framework"
  },
  DEV_IMPL_EFF_STRAT_SG: {
    id: 57,
    workstreamId: WORKSTREAM.STRATEGY_AND_GOVERNANCE.id,
    name: "Develop and Implement Efficiency Strategy - S&G"
  },
  DEV_SG_PROC: {
    id: 58,
    workstreamId: WORKSTREAM.STRATEGY_AND_GOVERNANCE.id,
    name: "Develop S&G Processes"
  },
  DEV_SG_ORG: {
    id: 59,
    workstreamId: WORKSTREAM.STRATEGY_AND_GOVERNANCE.id,
    name: "Develop S&G Organization"
  },
  SETUP_REG_FUNC: {
    id: 60,
    workstreamId: WORKSTREAM.STRATEGY_AND_GOVERNANCE.id,
    name: "Set up Regulatory Function"
  },
  SETUP_LEGAL_FUNC: {
    id: 61,
    workstreamId: WORKSTREAM.STRATEGY_AND_GOVERNANCE.id,
    name: "Set Up Legal Function"
  },
  SETUP_QUAL_RISK_FUNC: {
    id: 62,
    workstreamId: WORKSTREAM.STRATEGY_AND_GOVERNANCE.id,
    name: "Set Up Quality and Risk Function"
  },
  DEV_CORP_GOV: {
    id: 63,
    workstreamId: WORKSTREAM.STRATEGY_AND_GOVERNANCE.id,
    name: "Develop Corporate Governance"
  },
  DEV_TAWAL_ORG: {
    id: 64,
    workstreamId: WORKSTREAM.HR.id,
    name: "Develop Tawal Organization"
  },
  DEV_HR_STRAT: {
    id: 65,
    work4treamId: WORKSTREAM.HR.id,
    name: "Develop HR Strategy"
  },
  DEV_TAWAL_WORKFORCE_PLAN: {
    id: 66,
    workstreamId: WORKSTREAM.HR.id,
    name: "Develop Tawal Workforce Plan"
  },
  DEF_EMPL_PERF_DEV: {
    id: 67,
    workstreamId: WORKSTREAM.HR.id,
    name: "Define Employee performance & development"
  },
  DEV_HR_REP_CAP: {
    id: 68,
    workstreamId: WORKSTREAM.HR.id,
    name: "Develop HR Reporting Capability"
  },
  DEV_HR_POL_PROC_TOOL: {
    id: 69,
    workstreamId: WORKSTREAM.HR.id,
    name: "Develop HR Policies, Processes,Tools"
  },
  BUILD_TAWAL_OFFICES: {
    id: 70,
    workstreamId: WORKSTREAM.HR.id,
    name: "Build Tawal Offices"
  }
};
