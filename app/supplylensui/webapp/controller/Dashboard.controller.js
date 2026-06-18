sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (
    Controller,
    JSONModel
) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.Dashboard", {

        onInit: function () {
            var oData = {
                selectedPage: "chipset",

                kpis: {
                    portfolioRisk: 53,
                    criticalChipsets: "0/3",
                    revenueAtRisk: "$32.2M",
                    showing: "3/3",
                    watchlist: 1
                }
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "dashboard");
        },

        onNavChipset: function () {
            this.getView().getModel("dashboard").setProperty("/selectedPage", "chipset");
        },

        onNavBom: function () {
            this.getView().getModel("dashboard").setProperty("/selectedPage", "bom");
        },

        isChipsetPage: function (sPage) {
            return sPage === "chipset";
        },

        isBomPage: function (sPage) {
            return sPage === "bom";
        }

    });
});