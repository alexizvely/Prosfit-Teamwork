# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('shape_type', models.CharField(max_length=2, choices=[(b'sp', b'sphere'), (b'cu', b'cube'), (b'po', b'polygon')])),
                ('dimension_x', models.PositiveIntegerField()),
                ('dimension_y', models.PositiveIntegerField()),
                ('color', models.CharField(max_length=6)),
                ('status', models.CharField(default=b'saved', max_length=50, choices=[(b'saved', b'Saved'), (b'sentW', b'Sent for Manufacturing, Awaiting approval'), (b'sentA', b'Sent for Manufacturing, Approved'), (b'sentR', b'Returned for improvements'), (b'manuf', b'Manufactured')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
