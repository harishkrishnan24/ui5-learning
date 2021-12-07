sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "sapui5/demo/mvcapp/model/models"],
  function (UIComponent, JSONModel, models) {
    "use strict";

    return UIComponent.extend("sapui5.demo.mvcapp.Component", {
      metadata: {
        manifest: "json",
      },
      init: function () {
        UIComponent.prototype.init.apply(this, arguments);

        this.setModel(models.createDeviceModel(), "Device");
        this.getRouter().initialize();
      },
    });
  }
);
