sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/mvc/XMLView"
], function (Controller, XMLView) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.Dashboard", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();

            oRouter.getRoute("ChipsetRisk").attachPatternMatched(this._showChipsetRisk, this);
            oRouter.getRoute("BomManagement").attachPatternMatched(this._showBomManagement, this);
            oRouter.getRoute("ComponentRisk").attachPatternMatched(this._showComponentRisk, this);
            oRouter.getRoute("AIRecommendations").attachPatternMatched(this._showAIRecommendations, this);

            this._loadFromCurrentHash();
        },

        _loadFromCurrentHash: function () {
            var sHash = window.location.hash || "";

            if (sHash.indexOf("dashboard/bom") > -1) {
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

        _loadInnerView: function (sViewName) {
            var oApp = this.byId("dashboardApp");

            if (!oApp) {
                console.error("dashboardApp not found in Dashboard.view.xml");
                return;
            }

            var sViewId = this.getView().createId(sViewName);
            var oExistingPage = sap.ui.getCore().byId(sViewId);

            if (oExistingPage) {
                oApp.to(oExistingPage);
                return;
            }

            XMLView.create({
                id: sViewId,
                viewName: "sravan.bristlecone.supplylensui.view." + sViewName
            }).then(function (oView) {
                oApp.addPage(oView);
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
        }

    });
});