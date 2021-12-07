sap.ui.define(
  [
    "sapui5/demo/mvcapp/controller/BaseController",
    "sapui5/demo/mvcapp/model/formatter",
    "sapui5/demo/mvcapp/model/types",
  ],
  function (BaseController, formatter, types) {
    "use strict";

    return BaseController.extend("sapui5.demo.mvcapp.controller.Detail", {
      formatter: formatter,
      types: types,
      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */

      /**
       * Called when the worklist controller is instantiated.
       * @public
       */
      onInit: function () {
        this.getRouter()
          .getRoute("detail")
          .attachPatternMatched(this._onObjectMatched, this);

        var oModel = new sap.ui.model.json.JSONModel({
          buttonPrev: false,
          buttonNext: false,
        });
        this.getView().setModel(oModel, "viewModel");
      },

      /* =========================================================== */
      /* event handlers                                              */
      /* =========================================================== */

      /**
       * Navigates back to the Master
       * @function
       */
      onNavPress: function () {
        this.myNavBack("master");
      },

      onPageUp: function (oEvent) {
        var sID = oEvent.getSource().getBindingContext().sPath;
        sID = parseInt(sID.substr(sID.lastIndexOf("/") + 1));
        sID = sID - 1;
        this.getRouter().navTo("detail", { ID: sID });
      },

      onPageDown: function (oEvent) {
        var sID = oEvent.getSource().getBindingContext().sPath;
        sID = parseInt(sID.substr(sID.lastIndexOf("/") + 1));
        sID += 1;
        this.getRouter().navTo("detail", { ID: sID });
      },

      /* =========================================================== */
      /* internal methods                                            */
      /* =========================================================== */

      /**
       * Binds the view to the object path and maintains the paging
       * button state.
       *
       * @function
       * @param {sap.ui.base.Event} oEvent pattern match event in
       * route 'object'
       * @private
       */
      _onObjectMatched: function (oEvent) {
        this.sObjectID = oEvent.getParameter("arguments").ID;
        this.sObjectPath = "/Suppliers/" + this.sObjectID;
        this._bindView(this.sObjectPath);
        this._updateViewModel();
      },

      /**
       * Binds the view to the object path.
       *
       * @function
       * @param {string} sObjectPath path to the object to be bound
       * @private
       */
      _bindView: function (sObjectPath) {
        var oView = this.getView();
        oView.bindElement(sObjectPath);
      },

      /**
       * Updates the view model according to whether there are previous
       * and/or next suppliers.
       *
       * @function
       * @param {string} sObjectID path to the current supplier object
       * @private
       */
      _updateViewModel: function () {
        //find out if there is a next object in the line:
        var oModel = this.getView().getModel();
        var oViewModel = this.getView().getModel("viewModel");
        var nextObjectId = parseInt(this.sObjectID) + 1;
        var prevObjectId = parseInt(this.sObjectID) - 1;
        // check if there is a next object by adding +1 to the supplier ID
        //we assume we get a field we can safely order from the server
        var bNext = !!oModel.getProperty("/Suppliers/" + nextObjectId);
        var bPrev = !!oModel.getProperty("/Suppliers/" + prevObjectId);
        oViewModel.setProperty("/buttonNext", bNext);
        oViewModel.setProperty("/buttonPrev", bPrev);
      },
    });
  }
);
