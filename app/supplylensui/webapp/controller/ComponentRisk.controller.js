sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.ComponentRisk", {

        onInit: function () {
            var oData = {
                selectedTier: "ALL",
                sharedOnly: false,
                sortKey: "risk",

                kpis: {
                    totalComponents: "9",
                    sharedComponents: "0",
                    criticalRisk: "0",
                    revenueExposure: "$91.8M",
                    showing: "9/9"
                },

                components: [
                    {
                        name: "7nm Compute Die",
                        materialId: "BC-DIE-001",
                        node: "N7",
                        nodeCountry: "N7 . Taiwan",
                        plantCountry: "TSMC Hsinchu . Taiwan",
                        tier: "FOUNDRY",
                        tierLabel: "Foundry",
                        supplier: "TSMC Fab-18",
                        plant: "TSMC Hsinchu",
                        score: 72,
                        chipset: "BC-A1",
                        chipsetName: "Aurora A1 SoC",
                        revenue: "$24.6M",
                        sharedText: "—",
                        usageText: "Line 10 . 100% volume . Rev at risk: $24.6M"
                    },
                    {
                        name: "8L ABF Organic Substrate",
                        materialId: "BC-SUB-042",
                        node: "8L ABF",
                        nodeCountry: "8L ABF . China",
                        plantCountry: "Unimicron Shenzhen . China",
                        tier: "SUBSTRATE",
                        tierLabel: "Substrate",
                        supplier: "Unimicron SZ",
                        plant: "Unimicron Shenzhen",
                        score: 64,
                        chipset: "BC-A1",
                        chipsetName: "Aurora A1 SoC",
                        revenue: "$24.6M",
                        sharedText: "—",
                        usageText: "Line 30 . 100% volume . Rev at risk: $24.6M"
                    },
                    {
                        name: "CoWoS Silicon Interposer",
                        materialId: "BC-INT-001",
                        node: "CoWoS-S",
                        nodeCountry: "CoWoS-S . Taiwan",
                        plantCountry: "TSMC Taichung . Taiwan",
                        tier: "FOUNDRY",
                        tierLabel: "Foundry",
                        supplier: "TSMC CoWoS",
                        plant: "TSMC Taichung",
                        score: 48,
                        chipset: "BC-A1",
                        chipsetName: "Aurora A1 SoC",
                        revenue: "$24.6M",
                        sharedText: "—",
                        usageText: "Line 20 . 100% volume . Rev at risk: $24.6M"
                    },
                    {
                        name: "28nm MCU Die (Secondary - SMIC)",
                        materialId: "BC-DIE-003B",
                        node: "28nm",
                        nodeCountry: "28nm . China",
                        plantCountry: "SMIC Fab-1 . China",
                        tier: "FOUNDRY",
                        tierLabel: "Foundry",
                        supplier: "SMIC Shanghai",
                        plant: "SMIC Fab-1",
                        score: 44,
                        chipset: "BC-C3",
                        chipsetName: "Cygnus C3 MCU",
                        revenue: "$1.4M",
                        sharedText: "—",
                        usageText: "Line 11 . 25% volume . Rev at risk: $1.4M"
                    },
                    {
                        name: "6L ABF Substrate",
                        materialId: "BC-SUB-018",
                        node: "6L ABF",
                        nodeCountry: "6L ABF . Japan",
                        plantCountry: "Ibiden Ogaki . Japan",
                        tier: "SUBSTRATE",
                        tierLabel: "Substrate",
                        supplier: "Ibiden JP",
                        plant: "Ibiden Ogaki",
                        score: 42,
                        chipset: "BC-B2",
                        chipsetName: "Borealis B2 RFIC",
                        revenue: "$6.2M",
                        sharedText: "—",
                        usageText: "Line 20 . 100% volume . Rev at risk: $6.2M"
                    },
                    {
                        name: "14nm RF Die",
                        materialId: "BC-DIE-002",
                        node: "GF14",
                        nodeCountry: "GF14 . USA",
                        plantCountry: "GF Malta NY . USA",
                        tier: "FOUNDRY",
                        tierLabel: "Foundry",
                        supplier: "GlobalFoundries F8",
                        plant: "GF Malta NY",
                        score: 34,
                        chipset: "BC-B2",
                        chipsetName: "Borealis B2 RFIC",
                        revenue: "$6.2M",
                        sharedText: "—",
                        usageText: "Line 10 . 100% volume . Rev at risk: $6.2M"
                    },
                    {
                        name: "4L BT Substrate (Secondary - Unimicron)",
                        materialId: "BC-SUB-009B",
                        node: "4L BT",
                        nodeCountry: "4L BT . Taiwan",
                        plantCountry: "Unimicron Taoyuan . Taiwan",
                        tier: "SUBSTRATE",
                        tierLabel: "Substrate",
                        supplier: "Unimicron TW",
                        plant: "Unimicron Taoyuan",
                        score: 28,
                        chipset: "BC-C3",
                        chipsetName: "Cygnus C3 MCU",
                        revenue: "$1.4M",
                        sharedText: "—",
                        usageText: "Line 21 . 40% volume . Rev at risk: $1.4M"
                    },
                    {
                        name: "4L BT Substrate (Primary - Kinsus)",
                        materialId: "BC-SUB-009A",
                        node: "4L BT",
                        nodeCountry: "4L BT . Taiwan",
                        plantCountry: "Kinsus Zhongli . Taiwan",
                        tier: "SUBSTRATE",
                        tierLabel: "Substrate",
                        supplier: "Kinsus Zhongli",
                        plant: "Kinsus Zhongli",
                        score: 22,
                        chipset: "BC-C3",
                        chipsetName: "Cygnus C3 MCU",
                        revenue: "$1.4M",
                        sharedText: "—",
                        usageText: "Line 20 . 60% volume . Rev at risk: $1.4M"
                    },
                    {
                        name: "28nm MCU Die (Primary - UMC)",
                        materialId: "BC-DIE-003",
                        node: "28nm",
                        nodeCountry: "28nm . Taiwan",
                        plantCountry: "UMC Tainan . Taiwan",
                        tier: "FOUNDRY",
                        tierLabel: "Foundry",
                        supplier: "UMC Fab-12A",
                        plant: "UMC Tainan",
                        score: 18,
                        chipset: "BC-C3",
                        chipsetName: "Cygnus C3 MCU",
                        revenue: "$1.4M",
                        sharedText: "—",
                        usageText: "Line 10 . 75% volume . Rev at risk: $1.4M"
                    }
                ],

                displayComponents: [],
                selectedComponent: null
            };

            oData.displayComponents = oData.components;

            this.getView().setModel(new JSONModel(oData), "cr");
        },

        onFilterAll: function () {
            this._setFilter("ALL");
        },

        onFilterFoundry: function () {
            this._setFilter("FOUNDRY");
        },

        onFilterSubstrate: function () {
            this._setFilter("SUBSTRATE");
        },

        _setFilter: function (sTier) {
            var oModel = this.getView().getModel("cr");
            oModel.setProperty("/selectedTier", sTier);
            this._applyFilters();
        },

        onFilterShared: function () {
            var oModel = this.getView().getModel("cr");
            var bSharedOnly = oModel.getProperty("/sharedOnly");

            oModel.setProperty("/sharedOnly", !bSharedOnly);
            this._applyFilters();
        },

        onSortChange: function () {
            this._applyFilters();
        },

        onSelectComponent: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext("cr");

            if (!oCtx) {
                return;
            }

            this.getView().getModel("cr").setProperty("/selectedComponent", oCtx.getObject());
        },

        onCloseDetail: function () {
            this.getView().getModel("cr").setProperty("/selectedComponent", null);
        },

        _applyFilters: function () {
            var oModel = this.getView().getModel("cr");
            var aComponents = oModel.getProperty("/components") || [];
            var sTier = oModel.getProperty("/selectedTier");
            var bSharedOnly = oModel.getProperty("/sharedOnly");
            var sSortKey = oModel.getProperty("/sortKey");

            var aFiltered = aComponents.filter(function (oItem) {
                var bTierMatch = sTier === "ALL" || oItem.tier === sTier;
                var bSharedMatch = !bSharedOnly || oItem.sharedText !== "—";
                return bTierMatch && bSharedMatch;
            });

            aFiltered.sort(function (a, b) {
                if (sSortKey === "risk") {
                    return b.score - a.score;
                }

                if (sSortKey === "revenue") {
                    return this._getRevenueNumber(b.revenue) - this._getRevenueNumber(a.revenue);
                }

                if (sSortKey === "name") {
                    return a.name.localeCompare(b.name);
                }

                return b.score - a.score;
            }.bind(this));

            oModel.setProperty("/displayComponents", aFiltered);
            oModel.setProperty("/kpis/showing", aFiltered.length + "/9");
        },

        _getRevenueNumber: function (sValue) {
            return Number(String(sValue).replace("$", "").replace("M", ""));
        }

    });
});