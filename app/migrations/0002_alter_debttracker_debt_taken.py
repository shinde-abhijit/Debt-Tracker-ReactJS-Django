# Generated by Django 5.0.3 on 2024-03-04 12:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debttracker',
            name='debt_taken',
            field=models.DateField(default=datetime.datetime(2024, 3, 3, 18, 16, 16, 124869)),
        ),
    ]
