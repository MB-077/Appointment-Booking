# Generated by Django 5.0.6 on 2024-07-20 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment_selection', '0013_patientdetails_zip_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientdetails',
            name='age',
            field=models.CharField(blank=True, max_length=3),
        ),
    ]
