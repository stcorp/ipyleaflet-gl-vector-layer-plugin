const widgets = require('@jupyter-widgets/base');
import {LeafletGlVectorLayer} from '@stcorp/leaflet-gl-vector-layer';
function asciiDecode(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function readUint16LE(buffer) {
  var view = new DataView(buffer);
  var val = view.getUint8(0);
  val |= view.getUint8(1) << 8;
  return val;
}

function fromArrayBuffer(buf) {
  var magic = asciiDecode(buf.slice(0,6));
  if (magic.slice(1,6) != 'NUMPY') {
    throw new Error('unknown file type');
  }

  var version = new Uint8Array(buf.slice(6,8)),
      headerLength = readUint16LE(buf.slice(8,10)),
      headerStr = asciiDecode(buf.slice(10, 10+headerLength));
  var offsetBytes = 10 + headerLength;
  //rest = buf.slice(10+headerLength);  XXX -- This makes a copy!!! https://www.khronos.org/registry/typedarray/specs/latest/#5

  var info =  JSON.parse(headerStr.toLowerCase().replace('(','[').replace(',),',']').replace('),',']').replace(/'/g,"\""));

  // Intepret the bytes according to the specified dtype
  var data;
  if (info.descr === "|u1") {
    data = new Uint8Array(buf, offsetBytes);
  } else if (info.descr === "|i1") {
    data = new Int8Array(buf, offsetBytes);
  } else if (info.descr === "<u2") {
    data = new Uint16Array(buf, offsetBytes);
  } else if (info.descr === "<i2") {
    data = new Int16Array(buf, offsetBytes);
  } else if (info.descr === "<u4") {
    data = new Uint32Array(buf, offsetBytes);
  } else if (info.descr === "<i4") {
    data = new Int32Array(buf, offsetBytes);
  } else if (info.descr === "<f4") {
    data = new Float32Array(buf, offsetBytes);
  } else if (info.descr === "<f8") {
    data = new Float64Array(buf, offsetBytes);
  } else {
    throw new Error('unknown numeric dtype')
  }

  return {
    shape: info.shape,
    fortran_order: info.fortran_order,
    data: data ,
    get : function(x,y){
      if (this.shape.length == 2)
        return this.data[x*this.shape[0]+y]
      if (this.shape.length == 1)
        return this.data[x]},
    dim : function(){
      return this.shape.length}

  };
}


export class IpyleafletGlVectorLayerModel extends widgets.WidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'IpyleafletGlVectorLayerView',
      _view_module: 'ipyleaflet_gl_vector_layer',
      _model_name: 'IpyleafletGlVectorLayerModel',
      _model_module: 'ipyleaflet_gl_vector_layer'
    };
  }
}

IpyleafletGlVectorLayerModel.serializers = {
  ...widgets.WidgetModel.serializers
};

function camel_case(input) {
  // Convert from foo_bar to fooBar
  return input.toLowerCase().replace(/_(.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
}

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
    var o = this.model.get('options');
    var options = {};
    var key;
    for (var i = 0; i < o.length; i++) {
      key = o[i];
      // Convert from foo_bar to fooBar that Leaflet.js uses
      options[camel_case(key)] = this.model.get(key);
    }
    var leafletGlVectorLayerOptions = {data: {}, plot_type: this.model.get('plot_type'), colorrange: this.model.get('colorrange')};
    var lat_data;
    var lon_data;
    var data_data;

    if (this.model.get('lat_bytes')){
      lat_data = fromArrayBuffer(this.model.get('lat_bytes').buffer).data;
    } else if(this.model.get('lat')){
      lat_data = new Float64Array(this.model.get('lat'));
    }

    if (this.model.get('lon_bytes')){
      lon_data = fromArrayBuffer(this.model.get('lon_bytes').buffer).data;
    } else if (this.model.get('lon')) {     lon_data = new Float64Array(this.model.get('lon'));
    }

    if (this.model.get('data_bytes')){
      data_data = fromArrayBuffer(this.model.get('data_bytes').buffer).data;
    } else if (this.model.get('data')) {
      data_data = new Float64Array(this.model.get('data'));
    }
    leafletGlVectorLayerOptions.data = {
      latitudes: lat_data,
      longitudes: lon_data,
      values: data_data
    }
    return {
      ...options,
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

