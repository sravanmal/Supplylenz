sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, XMLView, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.Dashboard", {

        /* ===================================================== */
        /* LIFECYCLE */
        /* ===================================================== */

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();

            /* Dashboard section routes */
            oRouter.getRoute("ChipsetRisk").attachPatternMatched(this._showChipsetRisk, this);
            oRouter.getRoute("BomManagement").attachPatternMatched(this._showBomManagement, this);
            oRouter.getRoute("ComponentRisk").attachPatternMatched(this._showComponentRisk, this);
            oRouter.getRoute("AIRecommendations").attachPatternMatched(this._showAIRecommendations, this);

            /* Detail routes */
            oRouter.getRoute("ChipsetDetail").attachPatternMatched(this._showChipsetDetail, this);

            this._initDashboardModel();
            this._loadFromCurrentHash();
        },

        /* ===================================================== */
        /* DASHBOARD MODEL */
        /* ===================================================== */

        _initDashboardModel: function () {
            this.getView().setModel(new JSONModel({
                syncPanelVisible: false
            }), "dashboard");
        },

        /* ===================================================== */
        /* HASH FALLBACK */
        /* Used when browser is refreshed directly on a route */
        /* ===================================================== */

        _loadFromCurrentHash: function () {
            var sHash = window.location.hash || "";

            if (sHash.indexOf("dashboard/chipset/risk/") > -1) {
                this._showRiskDetail(null, {
                    chipsetId: sHash.split("dashboard/chipset/risk/")[1]
                });
                return;
            }

            if (sHash.indexOf("dashboard/chipset/") > -1) {
                this._showChipsetDetail(null, {
                    chipsetId: sHash.split("dashboard/chipset/")[1]
                });
                return;
            }

            if (sHash.indexOf("dashboard/bom") > -1) {
                this._showBomManagement();
                return;
            }

            if (sHash.indexOf("dashboard/component") > -1) {
                this._showComponentRisk();
                return;
            }

            if (sHash.indexOf("dashboard/ai") > -1) {
                this._showAIRecommendations();
                return;
            }

            this._showChipsetRisk();
        },

        /* ===================================================== */
        /* MAIN DASHBOARD PAGES */
        /* ===================================================== */

        _showChipsetRisk: function () {
            this._setActiveTab("tabChipset");
            this._loadInnerView("ChipsetRisk");
        },

        _showBomManagement: function () {
            this._setActiveTab("tabBom");
            this._loadInnerView("BomManagement");
        },

        _showComponentRisk: function () {
            this._setActiveTab("tabComponent");
            this._loadInnerView("ComponentRisk");
        },

        _showAIRecommendations: function () {
            this._setActiveTab("tabAi");
            this._loadInnerView("AIRecommendations");
        },

        /* ===================================================== */
        /* CHIPSET DETAIL PAGE */
        /* Route: dashboard/chipset/{chipsetId}
        /* ===================================================== */

        _showChipsetDetail: function (oEvent, oFallbackArgs) {
            var oArgs = oFallbackArgs || {};

            if (oEvent) {
                oArgs = oEvent.getParameter("arguments") || {};
            }

            this._setActiveTab("tabChipset");

            this._loadInnerView("ChipsetDetail", {
                chipsetId: oArgs.chipsetId || "BC-A1"
            });
        },


        /* ===================================================== */
        /* INNER VIEW LOADER */
        /* Loads views inside Dashboard.view.xml App aggregation */
        /* ===================================================== */

        _loadInnerView: function (sViewName, oViewData) {
            var oApp = this.byId("dashboardApp");

            if (!oApp) {
                console.error("dashboardApp not found in Dashboard.view.xml");
                return;
            }

            var sViewId = this.getView().createId(sViewName);
            var oExistingView = sap.ui.getCore().byId(sViewId);

            if (oExistingView) {
                this._applyArgumentsToView(oExistingView, oViewData);
                oApp.to(oExistingView);
                return;
            }

            XMLView.create({
                id: sViewId,
                viewName: "sravan.bristlecone.supplylensui.view." + sViewName,
                viewData: oViewData || {}
            }).then(function (oView) {
                oApp.addPage(oView);
                this._applyArgumentsToView(oView, oViewData);
                oApp.to(oView);
            }.bind(this));
        },

        _applyArgumentsToView: function (oView, oViewData) {
            var oController = oView.getController();

            if (oController && oController.applyRouteArguments) {
                oController.applyRouteArguments(oViewData || {});
            }
        },

        /* ===================================================== */
        /* TOP NAVIGATION ACTIVE TAB */
        /* ===================================================== */

        _setActiveTab: function (sActiveTabId) {
            ["tabChipset", "tabBom", "tabComponent", "tabAi"].forEach(function (sTabId) {
                var oTab = this.byId(sTabId);
                if (oTab) {
                    oTab.removeStyleClass("slActiveTab");
                }
            }.bind(this));

            var oActiveTab = this.byId(sActiveTabId);
            if (oActiveTab) {
                oActiveTab.addStyleClass("slActiveTab");
            }
        },

        /* ===================================================== */
        /* TOP NAVIGATION EVENTS */
        /* ===================================================== */

        onNavChipset: function () {
            this.getOwnerComponent().getRouter().navTo("ChipsetRisk");
        },

        onNavBom: function () {
            this.getOwnerComponent().getRouter().navTo("BomManagement");
        },

        onNavComponent: function () {
            this.getOwnerComponent().getRouter().navTo("ComponentRisk");
        },

        onNavAi: function () {
            this.getOwnerComponent().getRouter().navTo("AIRecommendations");
        },

        /* ===================================================== */
        /* DATA SYNC CENTER EVENTS */
        /* ===================================================== */

        onOpenSyncCenter: function () {
            this.getView().getModel("dashboard").setProperty("/syncPanelVisible", true);
        },

        onCloseSyncCenter: function () {
            this.getView().getModel("dashboard").setProperty("/syncPanelVisible", false);
        },

        onSyncAllNow: function () {
            MessageToast.show("Sync started for all feeds");
        },

        onSyncNow: function () {
            MessageToast.show("Sync started");
        }

    });
});