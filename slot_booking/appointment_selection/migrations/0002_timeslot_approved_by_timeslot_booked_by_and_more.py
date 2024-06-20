# Generated by Django 5.0.6 on 2024-06-20 07:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment_selection', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeslot',
            name='approved_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approved_timeslots', to='appointment_selection.doctor'),
        ),
        migrations.AddField(
            model_name='timeslot',
            name='booked_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='appointment_selection.patient'),
        ),
        migrations.AddField(
            model_name='timeslot',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='timeslot',
            name='reschedule_requested',
            field=models.BooleanField(default=False),
        ),
    ]
