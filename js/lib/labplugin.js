var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'ipyleaflet_gl_vector_layer',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'ipyleaflet_gl_vector_layer',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

