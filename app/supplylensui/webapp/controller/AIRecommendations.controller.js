sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sravan.bristlecone.supplylensui.controller.AIRecommendations", {

        onInit: function () {
            var oData = {
                selectedChipset: "ALL",
                selectedCategory: "ALL",
                analysisDone: false,
                chatInput: "How do I close the -28K gap?",

                suggestions: [
                    { text: "Why is Aurora A1 at risk?" },
                    { text: "Which supplier should I call first?" },
                    { text: "What is the ABF film risk?" },
                    { text: "How do I close the -28K gap?" }
                ],

                messages: [],

                recommendations: [
                    {
                        priority: "High",
                        category: "Risk Mitigation",
                        chipset: "BC-A1",
                        title: "Prioritise Aurora A1 substrate recovery",
                        description: "8L ABF Organic Substrate is driving high composite risk. Contact Unimicron SZ and validate recovery capacity before next demand cycle.",
                        impact: "Impact: $24.6M revenue exposure",
                        owner: "Owner: Supply Planning"
                    },
                    {
                        priority: "High",
                        category: "Inventory",
                        chipset: "BC-A1",
                        title: "Close the -28K supply gap with alternate allocation",
                        description: "Use available buffer from lower-risk demand buckets and re-plan the constrained Aurora A1 supply window.",
                        impact: "Impact: reduces shortage exposure",
                        owner: "Owner: Inventory Control"
                    },
                    {
                        priority: "Medium",
                        category: "Dual Sourcing",
                        chipset: "BC-C3",
                        title: "Increase secondary source readiness for 28nm MCU die",
                        description: "SMIC secondary allocation is carrying watch-level risk. Validate whether UMC can absorb additional 15-20% volume.",
                        impact: "Impact: improves resilience",
                        owner: "Owner: Supplier Management"
                    }
                ]
            };

            this.getView().setModel(new JSONModel(oData), "ai");
        },

        onRunAnalysis: function () {
            this.getView().getModel("ai").setProperty("/analysisDone", true);
            MessageToast.show("AI analysis completed");
        },

        onResetAnalysis: function () {
            this.getView().getModel("ai").setProperty("/analysisDone", false);
        },

        onSuggestionPress: function (oEvent) {
            var sText = oEvent.getSource().getText();
            this.getView().getModel("ai").setProperty("/chatInput", sText);
        },

        onSendMessage: function () {
            var oModel = this.getView().getModel("ai");
            var sInput = oModel.getProperty("/chatInput");

            if (!sInput || !sInput.trim()) {
                MessageToast.show("Please enter a question");
                return;
            }

            var aMessages = oModel.getProperty("/messages") || [];

            aMessages.push({
                type: "user",
                text: sInput
            });

            aMessages.push({
                type: "bot",
                text: this._getClaudeMockAnswer(sInput)
            });

            oModel.setProperty("/messages", aMessages);
            oModel.setProperty("/chatInput", "");
        },

        _getClaudeMockAnswer: function (sQuestion) {
            var sLower = sQuestion.toLowerCase();

            if (sLower.indexOf("aurora") > -1) {
                return "Aurora A1 is at risk because the 7nm Compute Die and 8L ABF Substrate have elevated scores. The main action is to validate supplier recovery dates and secure alternate substrate capacity.";
            }

            if (sLower.indexOf("supplier") > -1) {
                return "Call Unimicron SZ first because it contributes to the Aurora A1 substrate risk and has direct revenue exposure of $24.6M.";
            }

            if (sLower.indexOf("abf") > -1) {
                return "ABF film risk is concentrated around organic substrate availability. The 8L ABF line is currently the highest substrate concern for Aurora A1.";
            }

            if (sLower.indexOf("28k") > -1 || sLower.indexOf("gap") > -1) {
                return "To close the -28K gap, prioritise high-margin demand, confirm additional supplier allocation, and check whether BC-C3 lower-risk capacity can be rebalanced.";
            }

            return "Based on current mock SupplyLens data, focus first on high composite risk, single-source lines, and revenue exposure before changing demand plans.";
        }

    });
});