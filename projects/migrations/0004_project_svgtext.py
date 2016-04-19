# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_project_svgfile'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='svgText',
            field=models.CharField(default=b'', max_length=10000000),
            preserve_default=True,
        ),
    ]
