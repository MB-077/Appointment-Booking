# Generated by Django 5.0.6 on 2024-07-13 06:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment_selection', '0009_alter_doctor_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeslot',
            name='doctor',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='time_slots', to='appointment_selection.doctor'),
            preserve_default=False,
        ),
    ]
