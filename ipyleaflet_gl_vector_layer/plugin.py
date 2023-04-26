from ipyleaflet import LayerGroup, Layer
import io
import numpy as np
from traitlets import (
    Unicode, Bytes, Any, observe, Float, Union
)

from ._version import EXTENSION_VERSION
from traittypes import Array

class IpyleafletGlVectorLayer(Layer):
    lat_bytes = Bytes(allow_none=True).tag(sync=True)
    lon_bytes = Bytes(allow_none=True).tag(sync=True)
    data_bytes = Bytes(allow_none=True).tag(sync=True)
    plot_type = Unicode(allow_none=True).tag(sync=True)
    size = Unicode(allow_none=True).tag(sync=True)
    centerlon = Float(allow_none=True).tag(sync=True)
    centerlat = Float(allow_none=True).tag(sync=True)
    opacity = Float(allow_none=True).tag(sync=True)
    pointsize = Float(allow_none=True).tag(sync=True)
    colorrange = Array(allow_none=True).tag(sync=True)
    colormap = Union([Unicode(allow_none=True), Array(Unicode(allow_none=True))], allow_none=True).tag(sync=True)
    label = Unicode(allow_none=True).tag(sync=True)
    _view_name = Unicode('IpyleafletGlVectorLayerView').tag(sync=True)
    _model_name = Unicode('IpyleafletGlVectorLayerModel').tag(sync=True)
    _view_module = Unicode("@stcorp/ipyleaflet-gl-vector-layer-plugin").tag(sync=True)
    _model_module = Unicode("@stcorp/ipyleaflet-gl-vector-layer-plugin").tag(sync=True)
    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    def __init__(self, lat, lon, data, plot_type, colorrange=None, size=None, centerlon=0, centerlat=0, opacity=0.6,
                 pointsize=None, colormap=None, label=None, **kwargs):

        iobyte_lat = io.BytesIO()
        iobyte_lon = io.BytesIO()
        iobyte_data = io.BytesIO()

        np.save(iobyte_lat,lat)
        np.save(iobyte_lon,lon)
        np.save(iobyte_data,data)

        self.lat_bytes = iobyte_lat.getvalue()
        self.lon_bytes = iobyte_lon.getvalue()
        self.data_bytes = iobyte_data.getvalue()
        self.plot_type = plot_type
        self.colorrange = colorrange
        self.size = size
        self.centerlon = centerlon
        self.centerlat = centerlat
        self.opacity = opacity
        self.pointsize = pointsize
        self.colormap = colormap
        self.label = label
        super(IpyleafletGlVectorLayer, self).__init__(**kwargs)

    @observe('lat_bytes', 'lon_bytes', 'data_bytes', 'plot_type', 'colorrange', 'opacity', 'pointsize', 'colormap', 'colormaps')
    def _update_data(self, change):
        self.data = self._get_data()

    def _get_data(self):
        data = {
            "lat_bytes": self.lat_bytes,
            "lon_bytes": self.lon_bytes,
            "data_bytes": self.data_bytes,
            "plot_type": self.plot_type,
            "colorrange": self.colorrange,
            "opacity": self.opacity,
            "pointsize": self.pointsize,
            "colormap": self.colormap,
            "label": self.label
        }

        return data

class IpyleafletGlVectorLayerWrapper(LayerGroup):

    _view_name = Unicode('IpyleafletGlVectorLayerWrapperView').tag(sync=True)
    _model_name = Unicode('IpyleafletGlVectorLayerWrapperModel').tag(sync=True)
    _view_module = Unicode("@stcorp/ipyleaflet-gl-vector-layer-plugin").tag(sync=True)
    _model_module = Unicode("@stcorp/ipyleaflet-gl-vector-layer-plugin").tag(sync=True)
    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    # Options
    colormaps = Array(allow_none=True).tag(sync=True)

    def __init__(self, colormaps=None, **kwargs):
        self.colormaps = colormaps
        super(IpyleafletGlVectorLayerWrapper, self).__init__(**kwargs)


    def add_layer(self, layer):
        if layer.model_id in self._layer_ids:
            raise Exception('layer already in layergroup: %r' % layer)
        self.layers = tuple([layer for layer in self.layers] + [layer])


    @observe('colormaps')
    def _update_data(self, change):
        self.data = self._get_data()

    def _get_data(self):
        data = {
            "colormaps": self.colormaps
        }

        return data
