sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.Landing", {

        onOpenDashboard: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("Dashboard");
        }

    });
});