from __future__ import unicode_literals

from mopidy_gmui import Extension


def test_get_default_config():
    ext = Extension()

    config = ext.get_default_config()

    assert '[gmui]' in config
    assert 'enabled = true' in config
