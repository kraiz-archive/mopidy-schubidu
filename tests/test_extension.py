from __future__ import unicode_literals

from mopidy_schubidu import Extension


def test_get_default_config():
    ext = Extension()

    config = ext.get_default_config()

    assert '[schubidu]' in config
    assert 'enabled = true' in config
