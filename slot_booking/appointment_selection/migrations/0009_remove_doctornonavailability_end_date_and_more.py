# Generated by Django 5.0.6 on 2024-06-21 12:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointment_selection', '0008_rename_day_doctornonavailability_end_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctornonavailability',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='doctornonavailability',
            name='end_time',
        ),
        migrations.RemoveField(
            model_name='doctornonavailability',
            name='start_date',
        ),
        migrations.RemoveField(
            model_name='doctornonavailability',
            name='start_time',
        ),
    ]