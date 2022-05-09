from ._version import version_info, __version__

try:
    from .plugin import *
except ImportError:
    pass

def _jupyter_labextension_paths():
    return [{
        'src': 'labextension',
        'dest': 'ipyleaflet-gl-vector-layer',
    }]


def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'nbextension',
        'dest': 'ipyleaflet_gl_vector_layer',
        'require': 'ipyleaflet_gl_vector_layer/extension'
    }]
