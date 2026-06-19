sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, XMLView, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.Dashboard", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();

            oRouter.getRoute("ChipsetRisk").attachPatternMatched(this._showChipsetRisk, this);
            oRouter.getRoute("BomManagement").attachPatternMatched(this._showBomManagement, this);
            oRouter.getRoute("ComponentRisk").attachPatternMatched(this._showComponentRisk, this);
            oRouter.getRoute("AIRecommendations").attachPatternMatched(this._showAIRecommendations, this);
            oRouter.getRoute("ChipsetDetail").attachPatternMatched(this._showChipsetDetail, this);

            this._initDashboardModel();
            this._loadFromCurrentHash();
        },

        _initDashboardModel: function () {
            var oData = {
                syncPanelVisible: false,
                aribaFeeds: [],
                sapSources: []
            };

            this.getView().setModel(new JSONModel(oData), "dashboard");
        },

        _loadFromCurrentHash: function () {
            var sHash = window.location.hash || "";

            if (sHash.indexOf("dashboard/chipset/") > -1) {
                var sChipsetId = sHash.split("dashboard/chipset/")[1];
                this._showChipsetDetail(null, sChipsetId);
            } else if (sHash.indexOf("dashboard/bom") > -1) {
                this._showBomManagement();
            } else if (sHash.indexOf("dashboard/component") > -1) {
                this._showComponentRisk();
            } else if (sHash.indexOf("dashboard/ai") > -1) {
                this._showAIRecommendations();
            } else {
                this._showChipsetRisk();
            }
        },

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

        _showChipsetDetail: function (oEvent, sFallbackChipsetId) {
            var sChipsetId = sFallbackChipsetId;

            if (oEvent) {
                sChipsetId = oEvent.getParameter("arguments").chipsetId;
            }

            this._setActiveTab("tabChipset");

            this._loadInnerView("ChipsetDetail", {
                chipsetId: sChipsetId || "BC-A1"
            });
        },

        _loadInnerView: function (sViewName, oViewData) {
            var oApp = this.byId("dashboardApp");

            if (!oApp) {
                console.error("dashboardApp not found in Dashboard.view.xml");
                return;
            }

            var sViewId = this.getView().createId(sViewName);
            var oExistingPage = sap.ui.getCore().byId(sViewId);

            if (oExistingPage) {
                if (oExistingPage.getController().applyRouteArguments) {
                    oExistingPage.getController().applyRouteArguments(oViewData || {});
                }

                oApp.to(oExistingPage);
                return;
            }

            XMLView.create({
                id: sViewId,
                viewName: "sravan.bristlecone.supplylensui.view." + sViewName,
                viewData: oViewData || {}
            }).then(function (oView) {
                oApp.addPage(oView);

                if (oView.getController().applyRouteArguments) {
                    oView.getController().applyRouteArguments(oViewData || {});
                }

                oApp.to(oView);
            });
        },

        _setActiveTab: function (sActiveTabId) {
            var aTabs = ["tabChipset", "tabBom", "tabComponent", "tabAi"];

            aTabs.forEach(function (sTabId) {
                this.byId(sTabId).removeStyleClass("slActiveTab");
            }.bind(this));

            this.byId(sActiveTabId).addStyleClass("slActiveTab");
        },

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