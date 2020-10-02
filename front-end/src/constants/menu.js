const data = [
  {
    id: "reports",
    icon: "iconsminds-pie-chart",
    label: "menu.reports",
    to: "/app/reports",
    subs: [
      {
        icon: "simple-icon-graph",
        label: "Overall Progress",
        to: "/app/reports/progress"
      },
      {
        icon: "simple-icon-pie-chart",
        label: "Business View",
        to: "/app/reports/business-view"
      }
      // {
      //   icon: "simple-icon-organization",
      //   label: "CxOs Streams View",
      //   to: "/app/reports/cxos-streams"
      // },
      // {
      //   icon: "simple-icon-rocket",
      //   label: "Launch Milestones",
      //   to: "/app/reports/milestones"
      // },
    ]
  },
  {
    id: "spotlights",
    icon: "iconsminds-monitor-analytics",
    label: "menu.spotlights",
    to: "/app/spotlights",
    subs: [
      {
        icon: "simple-icon-globe",
        label: "COO",
        to: "/app/spotlights/coo"
      },
      {
        icon: "simple-icon-speech",
        label: "CCO",
        to: "/app/spotlights/cco"
      },
      {
        icon: "simple-icon-wallet",
        label: "CFO",
        to: "/app/spotlights/cfo"
      },
      {
        icon: "simple-icon-briefcase",
        label: "CSGO",
        to: "/app/spotlights/csgo"
      },
      {
        icon: "simple-icon-people",
        label: "CHRO",
        to: "/app/spotlights/chro"
      }
    ]
  },
  {
    id: "registers",
    icon: "iconsminds-folder",
    label: "menu.registers",
    to: "/app/registers",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.actions",
        to: "/app/registers/actions"
      },
      {
        icon: "simple-icon-exclamation",
        label: "menu.issues",
        to: "/app/registers/issues"
      }
    ]
  }
  // {
  //   id: "gogo",
  //   icon: "iconsminds-air-balloon-1",
  //   label: "menu.gogo",
  //   to: "/app/gogo",
  //   subs: [
  //     {
  //       icon: "simple-icon-paper-plane",
  //       label: "menu.start",
  //       to: "/app/gogo/start"
  //     }
  //   ]
  // },
  // {
  //   id: "docs",
  //   icon: "iconsminds-library",
  //   label: "menu.docs",
  //   to: "https://gogo-react-docs.coloredstrategies.com/",
  //   newWindow: true
  // }
];

export default data;
