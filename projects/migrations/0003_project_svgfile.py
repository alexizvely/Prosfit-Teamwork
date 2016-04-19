# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import projects.models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_project_dimension_z'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='svgFile',
            field=models.FileField(default=b'text.svg', upload_to=projects.models.upload_file_to, blank=True),
            preserve_default=True,
        ),
    ]
