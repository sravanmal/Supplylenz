sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.BomManagement", {

        onInit: function () {
            var oData = {
                selectedMode: "BROWSE",
                selectedChipsetId: "BC-A1",
                selectedChipset: {},

                chipsets: [
                    {
                        id: "BC-A1",
                        name: "Aurora A1 SoC",
                        summary: "3 lines . 3 suppliers",
                        score: "72",
                        description: "Edge AI Accelerator . BC-A1 . 3 lines . 3 suppliers",
                        footer: "3 BOM lines . 3 suppliers . 27 Ariba SCC subscriptions auto-generated . Grain: Material x Supplier . Volume split preserved",
                        lines: [
                            { line: "10", materialId: "BC-DIE-001", description: "7nm Compute Die", tier: "N7", node: "N7", volume: 100, volumeText: "100%", supplier: "TSMC Fab-18", plant: "TSMC Hsinchu", country: "Taiwan", score: "72", scoreState: "Warning", status: "At Risk", statusState: "Error" },
                            { line: "20", materialId: "BC-INT-001", description: "CoWoS Silicon Interposer", tier: "CoWoS-S", node: "CoWoS-S", volume: 100, volumeText: "100%", supplier: "TSMC CoWoS", plant: "TSMC Taichung", country: "Taiwan", score: "48", scoreState: "Warning", status: "Watch", statusState: "Warning" },
                            { line: "30", materialId: "BC-SUB-042", description: "8L ABF Organic Substrate", tier: "8L ABF", node: "8L ABF", volume: 100, volumeText: "100%", supplier: "Unimicron SZ", plant: "Unimicron Shenzhen", country: "China", score: "64", scoreState: "Warning", status: "At Risk", statusState: "Error" }
                        ]
                    },
                    {
                        id: "BC-B2",
                        name: "Borealis B2 RFIC",
                        summary: "2 lines . 2 suppliers",
                        score: "42",
                        description: "5G RF Front-End . BC-B2 . 2 lines . 2 suppliers",
                        footer: "2 BOM lines . 2 suppliers . 18 Ariba SCC subscriptions auto-generated . Grain: Material x Supplier . Volume split preserved",
                        lines: [
                            { line: "10", materialId: "BC-DIE-002", description: "14nm RF Die", tier: "GF14", node: "GF14", volume: 100, volumeText: "100%", supplier: "GlobalFoundries F8", plant: "GF Malta NY", country: "USA", score: "34", scoreState: "Warning", status: "Watch", statusState: "Warning" },
                            { line: "20", materialId: "BC-SUB-018", description: "6L ABF Substrate", tier: "6L ABF", node: "6L ABF", volume: 100, volumeText: "100%", supplier: "Ibiden JP", plant: "Ibiden Ogaki", country: "Japan", score: "42", scoreState: "Warning", status: "Watch", statusState: "Warning" }
                        ]
                    },
                    {
                        id: "BC-C3",
                        name: "Cygnus C3 MCU",
                        summary: "4 lines . 4 suppliers",
                        score: "44",
                        description: "Industrial Controller . BC-C3 . 4 lines . 4 suppliers",
                        footer: "4 BOM lines . 4 suppliers . 36 Ariba SCC subscriptions auto-generated . Grain: Material x Supplier . Volume split preserved",
                        lines: [
                            { line: "10", materialId: "BC-DIE-003", description: "28nm MCU Die (Primary - UMC)", tier: "28nm", node: "28nm", volume: 75, volumeText: "75%", supplier: "UMC Fab-12A", plant: "UMC Tainan", country: "Taiwan", score: "18", scoreState: "Success", status: "Healthy", statusState: "Success" },
                            { line: "11", materialId: "BC-DIE-003B", description: "28nm MCU Die (Secondary - SMIC)", tier: "28nm", node: "28nm", volume: 25, volumeText: "25%", supplier: "SMIC Shanghai", plant: "SMIC Fab-1", country: "China", score: "44", scoreState: "Warning", status: "Watch", statusState: "Warning" },
                            { line: "20", materialId: "BC-SUB-009A", description: "4L BT Substrate (Primary - Kinsus)", tier: "4L BT", node: "4L BT", volume: 60, volumeText: "60%", supplier: "Kinsus Zhongli", plant: "Kinsus Zhongli", country: "Taiwan", score: "22", scoreState: "Success", status: "Healthy", statusState: "Success" },
                            { line: "21", materialId: "BC-SUB-009B", description: "4L BT Substrate (Secondary - Unimicron)", tier: "4L BT", node: "4L BT", volume: 40, volumeText: "40%", supplier: "Unimicron TW", plant: "Unimicron Taoyuan", country: "Taiwan", score: "28", scoreState: "Warning", status: "Watch", statusState: "Warning" }
                        ]
                    }
                ]
            };

            oData.selectedChipset = oData.chipsets[0];
            this.getView().setModel(new JSONModel(oData), "bom");
        },

        onShowBrowse: function () {
            this.getView().getModel("bom").setProperty("/selectedMode", "BROWSE");
        },

        onShowUpload: function () {
            this.getView().getModel("bom").setProperty("/selectedMode", "UPLOAD");
        },

        onShowPull: function () {
            this.getView().getModel("bom").setProperty("/selectedMode", "PULL");
        },

        onSelectChipset: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext("bom");
            var oSelected = oCtx.getObject();
            var oModel = this.getView().getModel("bom");

            oModel.setProperty("/selectedChipsetId", oSelected.id);
            oModel.setProperty("/selectedChipset", oSelected);
        },

    });
});