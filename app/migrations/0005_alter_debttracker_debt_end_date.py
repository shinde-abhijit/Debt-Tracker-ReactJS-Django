# Generated by Django 5.0.3 on 2024-03-04 12:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_debttracker_debt_end_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debttracker',
            name='debt_end_date',
            field=models.DateField(default=datetime.datetime(2024, 3, 5, 18, 21, 47, 790381)),
        ),
    ]
