sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.ChipsetRisk", {

        onInit: function () {
            var oData = {
                selectedView: "HEATMAP",
                showFilters: false,
                sortKey: "risk",
                filterButtonText: "Filters v",
                hasActiveFilters: false,
                headerSubText: "All BOM lines with trading partners . Click any row to drill in",

                filters: {
                    family: "ALL",
                    customer: "ALL",
                    riskBand: "ALL",
                    singleSourceOnly: false
                },

                kpis: {
                    portfolioRisk: "53",
                    criticalChipsets: "0/3",
                    revenueAtRisk: "$32.2M",
                    showing: "3/3",
                    watchlist: "1"
                },

                chipsets: [
                    {
                        id: "BC-A1",
                        name: "Aurora A1 SoC",
                        description: "Edge AI Accelerator . Hyperscaler A",
                        family: "AI / ML",
                        customer: "Hyperscaler A",
                        revenueValue: 24.6,
                        singleSource: true,
                        watchlist: true,
                        compositeScore: "72",
                        riskLabel: "At Risk",
                        foundries: [
                            { score: "72", title: "7nm Compute Die", supplier: "TSMC Fab-18", meta: "N7 . 100%" },
                            { score: "48", title: "CoWoS Silicon Interposer", supplier: "TSMC CoWoS", meta: "CoWoS-S . 100%" }
                        ],
                        substrates: [
                            { score: "64", title: "8L ABF Organic Substrate", supplier: "Unimicron SZ", meta: "" }
                        ]
                    },
                    {
                        id: "BC-C3",
                        name: "Cygnus C3 MCU",
                        description: "Industrial Controller . Automotive OEM",
                        family: "Automotive",
                        customer: "Automotive OEM",
                        revenueValue: 1.4,
                        singleSource: false,
                        watchlist: false,
                        compositeScore: "44",
                        riskLabel: "Watch",
                        foundries: [
                            { score: "18", title: "28nm MCU Die (Primary - UMC)", supplier: "UMC Fab-12A", meta: "28nm . 75%" },
                            { score: "44", title: "28nm MCU Die (Secondary - SMIC)", supplier: "SMIC Shanghai", meta: "28nm . 25%" }
                        ],
                        substrates: [
                            { score: "22", title: "4L BT Substrate (Primary - Kinsus)", supplier: "Kinsus Zhongli", meta: "4L BT . 60%" },
                            { score: "28", title: "4L BT Substrate (Secondary - Unimicron)", supplier: "Unimicron TW", meta: "4L BT . 40%" }
                        ]
                    },
                    {
                        id: "BC-B2",
                        name: "Borealis B2 RFIC",
                        description: "5G RF Front-End . OEM Tier-1",
                        family: "RF / 5G",
                        customer: "OEM Tier-1",
                        revenueValue: 6.2,
                        singleSource: true,
                        watchlist: false,
                        compositeScore: "42",
                        riskLabel: "Watch",
                        foundries: [
                            { score: "34", title: "14nm RF Die", supplier: "GlobalFoundries F8", meta: "" }
                        ],
                        substrates: [
                            { score: "42", title: "6L ABF Substrate", supplier: "Ibiden JP", meta: "" }
                        ]
                    }
                ],

                displayChipsets: [],

                insightText: "Aurora A1 has 3 BOM lines - 7nm Compute Die (TSMC N7, score 72), CoWoS Interposer (TSMC CoWoS, score 48), 8L ABF Substrate (Unimicron SZ, score 64). Composite = 72. Cygnus C3 has 4 BOM lines - dual-source foundry (UMC 75% + SMIC 25%) and dual-source substrate (Kinsus 60% + Unimicron 40%). Direct feeds only - raw material proxy signals available in drill-down."
            };

            this.getView().setModel(new JSONModel(oData), "chipset");
            this._applyFilters();
        },

        onShowHeatmap: function () {
            this.getView().getModel("chipset").setProperty("/selectedView", "HEATMAP");
        },

        onShowAISnapshot: function () {
            this.getView().getModel("chipset").setProperty("/selectedView", "AI");
        },

        onToggleFilters: function () {
            var oModel = this.getView().getModel("chipset");
            var bCurrent = oModel.getProperty("/showFilters");

            oModel.setProperty("/showFilters", !bCurrent);
        },

        onSortChange: function () {
            this._applyFilters();
        },

        onClearFilters: function () {
            var oModel = this.getView().getModel("chipset");

            oModel.setProperty("/filters", {
                family: "ALL",
                customer: "ALL",
                riskBand: "ALL",
                singleSourceOnly: false
            });

            this._applyFilters();
        },

        onFamilyAll: function () {
            this._setFilter("family", "ALL");
        },

        onFamilyAiMl: function () {
            this._setFilter("family", "AI / ML");
        },

        onFamilyRf: function () {
            this._setFilter("family", "RF / 5G");
        },

        onFamilyAuto: function () {
            this._setFilter("family", "Automotive");
        },

        onCustomerAll: function () {
            this._setFilter("customer", "ALL");
        },

        onCustomerHyper: function () {
            this._setFilter("customer", "Hyperscaler A");
        },

        onCustomerOem: function () {
            this._setFilter("customer", "OEM Tier-1");
        },

        onCustomerAuto: function () {
            this._setFilter("customer", "Automotive OEM");
        },

        onRiskAll: function () {
            this._setFilter("riskBand", "ALL");
        },

        onRiskAtRisk: function () {
            this._setFilter("riskBand", "AT_RISK");
        },

        onRiskCritical: function () {
            this._setFilter("riskBand", "CRITICAL");
        },

        onRiskWatch: function () {
            this._setFilter("riskBand", "WATCH");
        },

        onRiskHealthy: function () {
            this._setFilter("riskBand", "HEALTHY");
        },

        onToggleSingleSource: function () {
            var oModel = this.getView().getModel("chipset");
            var bCurrent = oModel.getProperty("/filters/singleSourceOnly");

            oModel.setProperty("/filters/singleSourceOnly", !bCurrent);
            this._applyFilters();
        },

        onQuickNeedsAttention: function () {
            this._setFilter("riskBand", "AT_RISK");
        },

        onQuickSingleSource: function () {
            this.onToggleSingleSource();
        },

        onQuickWatchlist: function () {
            var oModel = this.getView().getModel("chipset");
            var aAll = oModel.getProperty("/chipsets");

            var aFiltered = aAll.filter(function (oItem) {
                return oItem.watchlist;
            });

            oModel.setProperty("/displayChipsets", aFiltered);
            oModel.setProperty("/kpis/showing", aFiltered.length + "/" + aAll.length);
            oModel.setProperty("/hasActiveFilters", true);
            oModel.setProperty("/filterButtonText", "Filters 1 v");
            oModel.setProperty("/headerSubText", aFiltered.length + " of " + aAll.length + " chipsets shown . 1 filter active");
        },

        onChipsetRowPress: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("chipset");

            if (!oContext) {
                return;
            }

            var oChipset = oContext.getObject();

            this.getOwnerComponent().getRouter().navTo("ChipsetDetail", {
                chipsetId: oChipset.id
            });
        },

        _setFilter: function (sPath, sValue) {
            var oModel = this.getView().getModel("chipset");

            oModel.setProperty("/filters/" + sPath, sValue);
            this._applyFilters();
        },

        _applyFilters: function () {
            var oModel = this.getView().getModel("chipset");
            var aAll = oModel.getProperty("/chipsets") || [];
            var oFilters = oModel.getProperty("/filters");
            var sSortKey = oModel.getProperty("/sortKey");

            var aFiltered = aAll.filter(function (oItem) {
                var bFamilyMatch = oFilters.family === "ALL" || oItem.family === oFilters.family;
                var bCustomerMatch = oFilters.customer === "ALL" || oItem.customer === oFilters.customer;
                var bSingleSourceMatch = !oFilters.singleSourceOnly || oItem.singleSource;

                var iScore = Number(oItem.compositeScore);
                var bRiskMatch = true;

                if (oFilters.riskBand === "AT_RISK") {
                    bRiskMatch = iScore >= 50;
                } else if (oFilters.riskBand === "CRITICAL") {
                    bRiskMatch = iScore >= 75;
                } else if (oFilters.riskBand === "WATCH") {
                    bRiskMatch = iScore >= 25 && iScore < 50;
                } else if (oFilters.riskBand === "HEALTHY") {
                    bRiskMatch = iScore < 25;
                }

                return bFamilyMatch && bCustomerMatch && bSingleSourceMatch && bRiskMatch;
            });

            if (sSortKey === "risk") {
                aFiltered.sort(function (a, b) {
                    return Number(b.compositeScore) - Number(a.compositeScore);
                });
            } else if (sSortKey === "revenue") {
                aFiltered.sort(function (a, b) {
                    return Number(b.revenueValue) - Number(a.revenueValue);
                });
            } else if (sSortKey === "name") {
                aFiltered.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
            }

            var iActiveFilters = 0;

            if (oFilters.family !== "ALL") {
                iActiveFilters++;
            }

            if (oFilters.customer !== "ALL") {
                iActiveFilters++;
            }

            if (oFilters.riskBand !== "ALL") {
                iActiveFilters++;
            }

            if (oFilters.singleSourceOnly) {
                iActiveFilters++;
            }

            oModel.setProperty("/displayChipsets", aFiltered);
            oModel.setProperty("/kpis/showing", aFiltered.length + "/" + aAll.length);
            oModel.setProperty("/hasActiveFilters", iActiveFilters > 0);
            oModel.setProperty("/filterButtonText", iActiveFilters > 0 ? "Filters " + iActiveFilters + " v" : "Filters v");

            if (iActiveFilters > 0) {
                oModel.setProperty("/headerSubText", aFiltered.length + " of " + aAll.length + " chipsets shown . " + iActiveFilters + " filter active");
            } else {
                oModel.setProperty("/headerSubText", "All BOM lines with trading partners . Click any row to drill in");
            }
        }

    });
});