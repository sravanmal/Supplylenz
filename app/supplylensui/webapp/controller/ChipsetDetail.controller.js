sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent"
], function (Controller, JSONModel, UIComponent) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.ChipsetDetail", {

        /* ===================================================== */
        /* LIFECYCLE */
        /* ===================================================== */

        onInit: function () {
            this._prepareMockData();

            this.getView().setModel(new JSONModel({}), "detail");
        },

        /* ===================================================== */
        /* ROUTE ARGUMENTS FROM DASHBOARD CONTROLLER */
        /* Called manually from Dashboard.controller.js */
        /* ===================================================== */

        applyRouteArguments: function (oArgs) {
            var sChipsetId = oArgs && oArgs.chipsetId ? oArgs.chipsetId : "BC-A1";

            var oSelectedData = this._oMockData[sChipsetId] || this._oMockData["BC-A1"];

            oSelectedData.selectedPlant = {
                name: "",
                location: "",
                wosPercent: 0,
                wos: "0w",
                score: "0",
                coverage: "0%",
                status: "",
                recommendedActions: []
            };

            oSelectedData.showSidePanel = false;

            this.getView().getModel("detail").setData(oSelectedData);
        },

        /* ===================================================== */
        /* EVENTS */
        /* ===================================================== */

        onBack: function () {
            window.location.hash = "#/dashboard/chipset";
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

        /* ===================================================== */
        /* MOCK DATA */
        /* ===================================================== */

        _prepareMockData: function () {
            this._oMockData = {

                "BC-A1": {
                    chipset: {
                        id: "BC-A1",
                        name: "Aurora A1 SoC",
                        subTitle: "Edge AI Accelerator • Hyperscaler A • 3 BOM lines • 3 suppliers",
                        riskBadge: "72 • At Risk"
                    },

                    availability: {
                        title: "OEM CHIPSET AVAILABILITY - Aurora A1 SoC",
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

                    plants: [
                        {
                            plantId: "A1001",
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
                            note: "Quality hold on lot #A1-882. Blocked inventory due to transit damage.",
                            score: "82",
                            coverage: "18%",
                            recommendedActions: [
                                "Escalate supplier executive immediately",
                                "Trigger allocation review with procurement",
                                "Evaluate alternate assembly source",
                                "Notify demand planning team"
                            ]
                        },
                        {
                            plantId: "A1002",
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
                            note: "Safety stock breach. Quality inspection batches pending release.",
                            score: "68",
                            coverage: "45%",
                            recommendedActions: [
                                "Increase inventory allocation",
                                "Release inspection lots",
                                "Review customer prioritization"
                            ]
                        },
                        {
                            plantId: "A1003",
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
                            note: "Inventory nearly depleted. Replenishment ETA W+3.",
                            score: "91",
                            coverage: "23%",
                            recommendedActions: [
                                "Expedite replenishment",
                                "Review customer commitments",
                                "Escalate logistics provider"
                            ]
                        },
                        {
                            plantId: "A1004",
                            name: "Customer VMI - Hyperscaler A",
                            location: "Ashburn, VA, USA",
                            type: "Customer VMI",
                            unrestricted: "8,800",
                            quality: "2,400",
                            blocked: "800",
                            total: "12,000",
                            wos: "0.5w",
                            wosPercent: 13,
                            status: "Critical",
                            note: "VMI inventory below contractual threshold.",
                            score: "95",
                            coverage: "13%",
                            recommendedActions: [
                                "Immediate replenishment",
                                "Customer escalation",
                                "Review demand forecast"
                            ]
                        }
                    ]
                },

                "BC-C3": {
                    chipset: {
                        id: "BC-C3",
                        name: "Cygnus C3 MCU",
                        subTitle: "Industrial Controller • Automotive OEM • 4 BOM lines • 4 suppliers",
                        riskBadge: "44 • Watch"
                    },

                    availability: {
                        title: "OEM CHIPSET AVAILABILITY - Cygnus C3 MCU",
                        customer: "Automotive OEM",
                        committedDemand: "120,000 u",
                        producible: "118,000 u",
                        supplyGap: "-2,000 u",
                        revenueAtRisk: "$1.4M",
                        safetyStockTarget: "180,000 u",
                        coverage: "74%"
                    },

                    portfolio: {
                        unrestricted: "146,000",
                        quality: "8,000",
                        blocked: "2,000",
                        totalStock: "156,000",
                        wos: "8.1w"
                    },

                    plants: [
                        {
                            plantId: "C3001",
                            name: "UMC Fab 12A",
                            location: "Tainan, Taiwan",
                            type: "Foundry",
                            unrestricted: "48,000",
                            quality: "2,000",
                            blocked: "500",
                            total: "50,500",
                            wos: "2.6w",
                            wosPercent: 65,
                            status: "Watch",
                            note: "Primary foundry source.",
                            score: "44",
                            coverage: "65%",
                            recommendedActions: [
                                "Monitor wafer allocation",
                                "Review capacity forecast"
                            ]
                        },
                        {
                            plantId: "C3002",
                            name: "SMIC Shanghai",
                            location: "Shanghai, China",
                            type: "Foundry",
                            unrestricted: "42,000",
                            quality: "1,500",
                            blocked: "400",
                            total: "43,900",
                            wos: "2.2w",
                            wosPercent: 55,
                            status: "Watch",
                            note: "Secondary foundry source.",
                            score: "38",
                            coverage: "55%",
                            recommendedActions: [
                                "Increase dual sourcing",
                                "Monitor geopolitical risk"
                            ]
                        },
                        {
                            plantId: "C3003",
                            name: "Kinsus Zhongli",
                            location: "Taoyuan, Taiwan",
                            type: "Substrate",
                            unrestricted: "30,000",
                            quality: "3,000",
                            blocked: "700",
                            total: "33,700",
                            wos: "1.7w",
                            wosPercent: 42,
                            status: "Healthy",
                            note: "Primary substrate supplier.",
                            score: "22",
                            coverage: "42%",
                            recommendedActions: [
                                "Maintain inventory levels"
                            ]
                        },
                        {
                            plantId: "C3004",
                            name: "Unimicron Taiwan",
                            location: "Hsinchu, Taiwan",
                            type: "Substrate",
                            unrestricted: "26,000",
                            quality: "1,500",
                            blocked: "400",
                            total: "27,900",
                            wos: "1.6w",
                            wosPercent: 40,
                            status: "Healthy",
                            note: "Secondary substrate supplier.",
                            score: "28",
                            coverage: "40%",
                            recommendedActions: [
                                "Continue current sourcing mix"
                            ]
                        }
                    ]
                },

                "BC-B2": {
                    chipset: {
                        id: "BC-B2",
                        name: "Borealis B2 RFIC",
                        subTitle: "5G RF Front-End • OEM Tier-1 • 2 BOM lines • 2 suppliers",
                        riskBadge: "42 • Watch"
                    },

                    availability: {
                        title: "OEM CHIPSET AVAILABILITY - Borealis B2 RFIC",
                        customer: "OEM Tier-1",
                        committedDemand: "48,000 u",
                        producible: "41,000 u",
                        supplyGap: "-7,000 u",
                        revenueAtRisk: "$6.2M",
                        safetyStockTarget: "72,000 u",
                        coverage: "57%"
                    },

                    portfolio: {
                        unrestricted: "72,000",
                        quality: "6,000",
                        blocked: "1,500",
                        totalStock: "79,500",
                        wos: "5.4w"
                    },

                    plants: [
                        {
                            plantId: "B2001",
                            name: "GlobalFoundries F8",
                            location: "New York, USA",
                            type: "Foundry",
                            unrestricted: "40,000",
                            quality: "3,000",
                            blocked: "800",
                            total: "43,800",
                            wos: "2.9w",
                            wosPercent: 72,
                            status: "Watch",
                            note: "RF die production facility.",
                            score: "34",
                            coverage: "72%",
                            recommendedActions: [
                                "Monitor fab utilization"
                            ]
                        },
                        {
                            plantId: "B2002",
                            name: "Ibiden Japan",
                            location: "Gifu, Japan",
                            type: "Substrate",
                            unrestricted: "24,000",
                            quality: "2,000",
                            blocked: "500",
                            total: "26,500",
                            wos: "1.8w",
                            wosPercent: 45,
                            status: "Watch",
                            note: "ABF substrate production.",
                            score: "42",
                            coverage: "45%",
                            recommendedActions: [
                                "Increase safety stock"
                            ]
                        },
                        {
                            plantId: "B2003",
                            name: "OEM Hub Frankfurt",
                            location: "Frankfurt, Germany",
                            type: "Distribution Hub",
                            unrestricted: "8,000",
                            quality: "1,000",
                            blocked: "200",
                            total: "9,200",
                            wos: "0.7w",
                            wosPercent: 18,
                            status: "Critical",
                            note: "Inventory below threshold.",
                            score: "61",
                            coverage: "18%",
                            recommendedActions: [
                                "Urgent replenishment",
                                "Review customer allocations"
                            ]
                        }
                    ]
                }
            };
        }

    });
});