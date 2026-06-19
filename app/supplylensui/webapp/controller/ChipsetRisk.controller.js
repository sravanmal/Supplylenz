sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.ChipsetRisk", {

        onInit: function () {
            var oData = {
                selectedView: "HEATMAP",

                kpis: {
                    portfolioRisk: "53",
                    criticalChipsets: "0/3",
                    revenueAtRisk: "$32.2M",
                    showing: "3/3",
                    watchlist: "1"
                },

                chipsets: [
                    {
                        name: "Aurora A1 SoC",
                        description: "Edge AI Accelerator . Hyperscaler A",
                        tag: "AI / ML",
                        singleSource: true,
                        compositeScore: "72",
                        riskLabel: "At Risk",
                        foundries: [
                            {
                                score: "72",
                                title: "7nm Compute Die",
                                supplier: "TSMC Fab-18",
                                meta: "N7 . 100%"
                            },
                            {
                                score: "48",
                                title: "CoWoS Silicon Interposer",
                                supplier: "TSMC CoWoS",
                                meta: "CoWoS-S . 100%"
                            }
                        ],
                        substrates: [
                            {
                                score: "64",
                                title: "8L ABF Organic Substrate",
                                supplier: "Unimicron SZ",
                                meta: ""
                            }
                        ]
                    },
                    {
                        name: "Cygnus C3 MCU",
                        description: "Industrial Controller . Automotive OEM",
                        tag: "Automotive",
                        singleSource: false,
                        compositeScore: "44",
                        riskLabel: "Watch",
                        foundries: [
                            {
                                score: "18",
                                title: "28nm MCU Die (Primary - UMC)",
                                supplier: "UMC Fab-12A",
                                meta: "28nm . 75%"
                            },
                            {
                                score: "44",
                                title: "28nm MCU Die (Secondary - SMIC)",
                                supplier: "SMIC Shanghai",
                                meta: "28nm . 25%"
                            }
                        ],
                        substrates: [
                            {
                                score: "22",
                                title: "4L BT Substrate (Primary - Kinsus)",
                                supplier: "Kinsus Zhongli",
                                meta: "4L BT . 60%"
                            },
                            {
                                score: "28",
                                title: "4L BT Substrate (Secondary - Unimicron)",
                                supplier: "Unimicron TW",
                                meta: "4L BT . 40%"
                            }
                        ]
                    },
                    {
                        name: "Borealis B2 RFIC",
                        description: "5G RF Front-End . OEM Tier-1",
                        tag: "RF / 5G",
                        singleSource: true,
                        compositeScore: "42",
                        riskLabel: "Watch",
                        foundries: [
                            {
                                score: "34",
                                title: "14nm RF Die",
                                supplier: "GlobalFoundries F8",
                                meta: ""
                            }
                        ],
                        substrates: [
                            {
                                score: "42",
                                title: "6L ABF Substrate",
                                supplier: "Ibiden JP",
                                meta: ""
                            }
                        ]
                    }
                ],

                insightText: "Aurora A1 has 3 BOM lines - 7nm Compute Die (TSMC N7, score 72), CoWoS Interposer (TSMC CoWoS, score 48), 8L ABF Substrate (Unimicron SZ, score 64). Composite = 72. Cygnus C3 has 4 BOM lines - dual-source foundry (UMC 75% + SMIC 25%) and dual-source substrate (Kinsus 60% + Unimicron 40%). Direct feeds only - raw material proxy signals available in drill-down."
            };

            this.getView().setModel(new JSONModel(oData), "chipset");
        },

        onShowHeatmap: function () {
            this.getView().getModel("chipset").setProperty("/selectedView", "HEATMAP");
        },

        onShowAISnapshot: function () {
            this.getView().getModel("chipset").setProperty("/selectedView", "AI");
        }

    });
});