from __future__ import print_function
from setuptools import setup, find_packages
import os
from os.path import join as pjoin
from distutils import log

from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    get_version,
)


here = os.path.dirname(os.path.abspath(__file__))

log.set_verbosity(log.DEBUG)

name = 'ipyleaflet_gl_vector_layer'
LONG_DESCRIPTION = 'A GL-powered vector-layer for ipyleaflet'

# Get ipyleaflet_gl_vector_layer version
version = get_version(pjoin(name, '_version.py'))

js_dir = pjoin(here, 'js')

# Representative files that should exist after a successful build
jstargets = [
    pjoin(js_dir, 'dist', 'index.js'),
]

labext_name = '@stcorp/ipyleaflet-gl-vector-layer-plugin'

data_files_spec = [
    ('share/jupyter/nbextensions/%s' % labext_name, 'ipyleaflet_gl_vector_layer/nbextension', '*.*'),
    ('share/jupyter/labextensions/%s' % labext_name, 'ipyleaflet_gl_vector_layer/labextension', '**'),
    ('share/jupyter/labextensions/%s' % labext_name, '.', 'install.json'),
    ('etc/jupyter/nbconfig/notebook.d', '.', 'ipyleaflet_gl_vector_layer.json'),
]

cmdclass = create_cmdclass('jsdeps', data_files_spec=data_files_spec)
cmdclass['jsdeps'] = combine_commands(
    install_npm(js_dir, npm=['yarn'], build_cmd='build:prod'), ensure_targets(jstargets),
)

setup_args = dict(
    name=name,
    version=version,
    description='A GL-powered vector-layer for ipyleaflet',
    long_description=LONG_DESCRIPTION,
    include_package_data=True,
    install_requires=[
        'ipywidgets>=7.6.0',
        'ipyleaflet>=0.15.0',
        'numpy',
        'traittypes',
        'traitlets',
    ],
    packages=find_packages(),
    zip_safe=False,
    cmdclass=cmdclass,
    author='Martti Kaipiainen',
    author_email='martti.kaipiainen@stcorp.nl',
    url='https://github.com//ipyleaflet_gl_vector_layer',
    keywords=[
        'ipywidgets',
        'jupyter',
        'widgets',
        'ipyleaflet',
        'gl',
    ],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Framework :: IPython',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'Topic :: Multimedia :: Graphics',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
    ],
)

setup(**setup_args)
