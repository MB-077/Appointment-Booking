from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField()
    specialty = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.user.username

class TimeSlot(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_booked = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    booked_by = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    approved_by = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_timeslots')
    reschedule_requested = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.start_time} - {self.end_time}"

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    time_slot = models.OneToOneField(TimeSlot, on_delete=models.CASCADE)

    def __str__(self):
        return f"Appointment with {self.doctor} for {self.patient} on {self.date} at {self.time_slot.start_time}"