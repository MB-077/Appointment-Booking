# Generated by Django 5.0.6 on 2024-07-17 04:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointment_selection', '0011_pastappointment'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PastAppointment',
        ),
    ]