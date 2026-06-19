sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.ChipsetDetail", {

        onInit: function () {
            var oData = this._getInitialData();

            this.getView().setModel(new JSONModel(oData), "detail");
            this.applyRouteArguments(this.getView().getViewData() || {});
        },

        applyRouteArguments: function (oArgs) {
            var sChipsetId = oArgs && oArgs.chipsetId ? oArgs.chipsetId : "BC-A1";
            var oModel = this.getView().getModel("detail");
            var aChipsets = oModel.getProperty("/chipsets") || [];

            var oSelectedChipset = aChipsets.find(function (oItem) {
                return oItem.id === sChipsetId;
            }) || aChipsets[0];

            oModel.setProperty("/chipset", oSelectedChipset);
            oModel.setProperty("/availability", oSelectedChipset.availability);
            oModel.setProperty("/portfolio", oSelectedChipset.portfolio);
            oModel.setProperty("/plants", oSelectedChipset.plants);
            oModel.setProperty("/summary", oSelectedChipset.summary);
            oModel.setProperty("/bomLines", oSelectedChipset.bomLines);
            oModel.setProperty("/selectedBomId", oSelectedChipset.bomLines[0].id);
            oModel.setProperty("/selectedBom", oSelectedChipset.bomLines[0]);
            oModel.setProperty("/selectedPlant", {});
            oModel.setProperty("/showSidePanel", false);
        },

        onBack: function () {

            window.location.hash = "#/dashboard/chipset";
        },

        onBomLinePress: function (oEvent) {
            var sBomId = oEvent.getSource().data("bomId");
            var oModel = this.getView().getModel("detail");
            var aBomLines = oModel.getProperty("/bomLines") || [];

            var oSelected = aBomLines.find(function (oItem) {
                return oItem.id === sBomId;
            });

            if (oSelected) {
                oModel.setProperty("/selectedBomId", sBomId);
                oModel.setProperty("/selectedBom", oSelected);
            }
        },

        onPlantPress: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("detail");

            if (!oContext) {
                return;
            }

            var oPlant = oContext.getObject();
            var oModel = this.getView().getModel("detail");

            oModel.setProperty("/selectedPlant", oPlant);
            oModel.setProperty("/showSidePanel", true);
        },

        onCloseSidePanel: function () {
            this.getView().getModel("detail").setProperty("/showSidePanel", false);
        },

        _getInitialData: function () {
            return {
                chipset: {},
                availability: {},
                portfolio: {},
                plants: [],
                summary: {},
                bomLines: [],
                selectedBomId: "",
                selectedBom: {},
                selectedPlant: {},
                showSidePanel: false,

                actions: [
                    { text: "1. Escalate to supplier executive immediately" },
                    { text: "2. Trigger allocation review with procurement" },
                    { text: "3. Notify demand planning of potential shortfall" },
                    { text: "4. Evaluate expedite or air-freight options" }
                ],

                chipsets: [
                    {
                        id: "BC-A1",
                        name: "Aurora A1 SoC",
                        subTitle: "Edge AI Accelerator . Hyperscaler A . 3 BOM lines . 3 suppliers",
                        riskBadge: "72 . At Risk",
                        availability: {
                            customer: "Hyperscaler A",
                            committedDemand: "92,000 u",
                            producible: "64,000 u",
                            supplyGap: "-28,000 u",
                            revenueAtRisk: "$24.6M",
                            safetyStockTarget: "138,000 u",
                            coverage: "61%"
                        },
                        portfolio: {
                            unrestricted: "58,800",
                            quality: "17,000",
                            blocked: "8,400",
                            totalStock: "84,200",
                            wos: "33.2w"
                        },
                        summary: {
                            chipsetRisk: "72",
                            foundryLines: "2",
                            substrateLines: "1",
                            supplyGap: "-28K",
                            revenueAtRisk: "$24.6M"
                        },
                        plants: [
                            {
                                name: "ASE Penang",
                                location: "Penang, Malaysia",
                                type: "OSAT FG",
                                unrestricted: "12,400",
                                quality: "3,800",
                                blocked: "2,200",
                                total: "18,400",
                                wos: "0.7w",
                                wosPercent: 18,
                                status: "Critical",
                                note: "Quality hold on lot #A1-882. Blocked = damage in transit."
                            },
                            {
                                name: "OEM DC - Singapore",
                                location: "Singapore",
                                type: "OEM Warehouse",
                                unrestricted: "31,200",
                                quality: "9,600",
                                blocked: "4,800",
                                total: "45,600",
                                wos: "1.8w",
                                wosPercent: 45,
                                status: "Critical",
                                note: "Quality inspection batch pending. Safety stock breach."
                            },
                            {
                                name: "OEM Hub - San Jose",
                                location: "San Jose, CA, USA",
                                type: "OEM Hub",
                                unrestricted: "6,400",
                                quality: "1,200",
                                blocked: "600",
                                total: "8,200",
                                wos: "0.9w",
                                wosPercent: 23,
                                status: "Critical",
                                note: "Nearly depleted. Replenishment ETA W+3."
                            }
                        ],
                        bomLines: [
                            {
                                id: "BC-DIE-001",
                                node: "N7",
                                name: "7nm Compute Die",
                                supplierText: "TSMC Fab-18 . TSMC Hsinchu . Taiwan",
                                score: "72",
                                line: "Line 10",
                                volume: "100% vol"
                            },
                            {
                                id: "BC-INT-001",
                                node: "CoWoS-S",
                                name: "CoWoS Silicon Interposer",
                                supplierText: "TSMC CoWoS . TSMC Taichung . Taiwan",
                                score: "48",
                                line: "Line 20",
                                volume: "100% vol"
                            },
                            {
                                id: "BC-SUB-042",
                                node: "8L ABF",
                                name: "8L ABF Organic Substrate",
                                supplierText: "Unimicron SZ . Unimicron Shenzhen . China",
                                score: "64",
                                line: "Line 30",
                                volume: "100% vol"
                            }
                        ]
                    },
                    {
                        id: "BC-C3",
                        name: "Cygnus C3 MCU",
                        subTitle: "Industrial Controller . Automotive OEM . 4 BOM lines . 4 suppliers",
                        riskBadge: "44 . Watch",
                        availability: {
                            customer: "Automotive OEM",
                            committedDemand: "48,000 u",
                            producible: "42,000 u",
                            supplyGap: "-6,000 u",
                            revenueAtRisk: "$1.4M",
                            safetyStockTarget: "72,000 u",
                            coverage: "82%"
                        },
                        portfolio: {
                            unrestricted: "42,200",
                            quality: "6,100",
                            blocked: "1,900",
                            totalStock: "50,200",
                            wos: "4.1w"
                        },
                        summary: {
                            chipsetRisk: "44",
                            foundryLines: "2",
                            substrateLines: "2",
                            supplyGap: "-6K",
                            revenueAtRisk: "$1.4M"
                        },
                        plants: [
                            {
                                name: "UMC Tainan",
                                location: "Tainan, Taiwan",
                                type: "Foundry",
                                unrestricted: "22,000",
                                quality: "2,100",
                                blocked: "600",
                                total: "24,700",
                                wos: "2.8w",
                                wosPercent: 70,
                                status: "Watch",
                                note: "Secondary source available."
                            }
                        ],
                        bomLines: [
                            {
                                id: "BC-DIE-003",
                                node: "28nm",
                                name: "28nm MCU Die",
                                supplierText: "UMC Fab-12A . UMC Tainan . Taiwan",
                                score: "18",
                                line: "Line 10",
                                volume: "75% vol"
                            }
                        ]
                    },
                    {
                        id: "BC-B2",
                        name: "Borealis B2 RFIC",
                        subTitle: "5G RF Front-End . OEM Tier-1 . 2 BOM lines . 2 suppliers",
                        riskBadge: "42 . Watch",
                        availability: {
                            customer: "OEM Tier-1",
                            committedDemand: "36,000 u",
                            producible: "31,000 u",
                            supplyGap: "-5,000 u",
                            revenueAtRisk: "$6.2M",
                            safetyStockTarget: "54,000 u",
                            coverage: "78%"
                        },
                        portfolio: {
                            unrestricted: "30,600",
                            quality: "4,000",
                            blocked: "900",
                            totalStock: "35,500",
                            wos: "3.6w"
                        },
                        summary: {
                            chipsetRisk: "42",
                            foundryLines: "1",
                            substrateLines: "1",
                            supplyGap: "-5K",
                            revenueAtRisk: "$6.2M"
                        },
                        plants: [
                            {
                                name: "GF Malta NY",
                                location: "New York, USA",
                                type: "Foundry",
                                unrestricted: "18,400",
                                quality: "3,200",
                                blocked: "700",
                                total: "22,300",
                                wos: "3.1w",
                                wosPercent: 78,
                                status: "Watch",
                                note: "Capacity tight but stable."
                            }
                        ],
                        bomLines: [
                            {
                                id: "BC-DIE-002",
                                node: "GF14",
                                name: "14nm RF Die",
                                supplierText: "GlobalFoundries F8 . Malta NY . USA",
                                score: "34",
                                line: "Line 10",
                                volume: "100% vol"
                            }
                        ]
                    }
                ]
            };
        }

    });
});