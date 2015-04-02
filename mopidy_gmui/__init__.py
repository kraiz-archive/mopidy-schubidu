from __future__ import unicode_literals

import os

from mopidy import config, ext


__version__ = '0.1.0'


class Extension(ext.Extension):
    dist_name = 'Mopidy-Gmui'
    ext_name = 'gmui'
    version = __version__

    def get_default_config(self):
        conf_file = os.path.join(os.path.dirname(__file__), 'ext.conf')
        return config.read(conf_file)

    def setup(self, registry):
        registry.add('http:static', {
            'name': self.ext_name,
            'path': os.path.join(os.path.dirname(__file__), 'static'),
        })
