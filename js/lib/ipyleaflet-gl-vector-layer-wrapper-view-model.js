const widgets = require('@jupyter-widgets/base');
import {LeafletGlVectorLayerWrapper} from '@stcorp/leaflet-gl-vector-layer';
export class IpyleafletGlVectorLayerWrapperModel extends widgets.WidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'IpyleafletGlVectorLayerWrapperView',
      _view_module: '@stcorp/ipyleaflet-gl-vector-layer-plugin',
      _model_name: 'IpyleafletGlVectorLayerWrapperModel',
      _model_module: '@stcorp/ipyleaflet-gl-vector-layer-plugin',
      layers: []
    };
  }
}

IpyleafletGlVectorLayerWrapperModel.serializers = {
  ...widgets.WidgetModel.serializers,
  layers: { deserialize: widgets.unpack_models }
};

export class IpyleafletGlVectorLayerWrapperView extends widgets.WidgetView {

  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  render() {
    return Promise.resolve(this.create_obj()).then(() => {
      this.model_events();
      this.leaflet_events();
    });
  }
  leaflet_events() {
    // If the layer is interactive
    if (this.obj.on) {
      this.obj.on(
          'click dblclick mousedown mouseup mouseover mouseout',
          event => {
            this.send({
              event: 'interaction',
              type: event.type,
              coordinates: [event.latlng.lat, event.latlng.lng]
            });
          }
      );
      // this layer is transformable
      if (this.obj.transform) {
        // add the handler only when the layer has been added
        this.obj.on('add', () => {
          this.update_transform();
        });
        this.obj.on('transformed', () => {
          this.model.set('locations', this.obj.getLatLngs());
          this.touch();
        });
      }
    }
  }
  onRemove() {
    super.remove();
  }

  create_obj() {
    this.obj = new LeafletGlVectorLayerWrapper({colormaps: this.model.get('colormaps')});
    this.layer_views = new widgets.ViewList(
        this.add_layer_model,
        this.remove_layer_view,
        this
    );
    this.layer_views.update(this.model.get('layers'));
    return this;
  }

  remove_layer_view(child_view) {
    this.obj.removeLayer(child_view.obj);
    child_view.remove();
  }


  add_layer_model(child_model) {
    return this.create_child_view(child_model).then(child_view => {
      this.obj.addLayer(child_view.obj);
      return child_view;
    });
  }

  model_events() {
    this.listenTo(
        this.model,
        'change:layers',
        function() {
          this.layer_views.update(this.model.get('layers'));
        },
        this
    );
  }

}

