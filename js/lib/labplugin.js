var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: '@stcorp/ipyleaflet-gl-vector-layer-plugin',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: '@stcorp/ipyleaflet-gl-vector-layer-plugin',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

