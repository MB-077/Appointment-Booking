# Generated by Django 5.0.6 on 2024-07-10 10:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment_selection', '0006_alter_doctornonavailability_start_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientdetails',
            name='patient',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='patient', to='appointment_selection.patient'),
        ),
    ]
