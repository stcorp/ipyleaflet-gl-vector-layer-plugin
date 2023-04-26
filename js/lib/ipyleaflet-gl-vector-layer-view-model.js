import {fromArrayBuffer} from "./from-array-buffer";

const widgets = require('@jupyter-widgets/base');
import {LeafletGlVectorLayer} from '@stcorp/leaflet-gl-vector-layer';

export class IpyleafletGlVectorLayerModel extends widgets.WidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'IpyleafletGlVectorLayerView',
      _view_module: '@stcorp/ipyleaflet-gl-vector-layer-plugin',
      _model_name: 'IpyleafletGlVectorLayerModel',
      _model_module: '@stcorp/ipyleaflet-gl-vector-layer-plugin'
    };
  }
}

IpyleafletGlVectorLayerModel.serializers = {
  ...widgets.WidgetModel.serializers
};

export class IpyleafletGlVectorLayerView extends widgets.WidgetView {

  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;

    return Promise.resolve(this.create_obj()).then(() => {
      this.leaflet_events();
      this.model_events();
    });
  }

  onRemove() {
    this.remove();
  }

  remove_layer_view(child_view) {
    child_view.remove();
  }

  create_obj() {
    this.obj = new LeafletGlVectorLayer(this.get_options());
  }

  get_options() {
    let colormap = this.model.get('colormap');

    var lat_data;
    var lon_data;
    var data_data;
    // RGB(A) passed instead of XRGBA
    if(colormap && !Array.isArray(colormap)) {
      console.error('colormap must be an array');
      colormap = undefined;
    }
    var leafletGlVectorLayerOptions = {
      data: {},
      plot_type: this.model.get('plot_type'),
      colorrange: this.model.get('colorrange'),
      pointsize: this.model.get('pointsize'),
      colormap: colormap,
      colormaps: this.model.get('colormaps'),
      label: this.model.get('label')
    };
    if (this.model.get('lat_bytes')){
      lat_data = fromArrayBuffer(this.model.get('lat_bytes').buffer).data;
    } else if(this.model.get('lat')){
      lat_data = new Float32Array(this.model.get('lat'));
    }

    if (this.model.get('lon_bytes')){
      lon_data = fromArrayBuffer(this.model.get('lon_bytes').buffer).data;
    } else if (this.model.get('lon')) {
      lon_data = new Float32Array(this.model.get('lon'));
    }

    if (this.model.get('data_bytes')){
      data_data = fromArrayBuffer(this.model.get('data_bytes').buffer).data;
    } else if (this.model.get('data')) {
      data_data = new Float32Array(this.model.get('data'));
    }
    leafletGlVectorLayerOptions.data = {
      latitudes: lat_data,
      longitudes: lon_data,
      values: data_data
    }

    return {
      opacity: this.model.get('opacity'),
      leafletGlVectorLayerOptions: leafletGlVectorLayerOptions
    };
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

  remove() {
    super.remove();
  }

  model_events() {
    var key;
    var o = this.model.get('options');
    for (var i = 0; i < o.length; i++) {
      key = o[i];
      this.listenTo(
          this.model,
          'change:' + key,
          function() {
            this.map_view.obj.removeLayer(this.obj);
            this.create_obj().then(() => {
              this.map_view.obj.addLayer(this.obj);
            });
          },
          this
      );
    }
  }
}

