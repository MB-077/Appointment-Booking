from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField()
    specialty = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username

class DoctorNonAvailability(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    start_date = models.DateField()
    start_time = models.TimeField()
    end_date = models.DateField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.doctor} is not available on {self.start_date} from {self.start_time} to {self.end_date} till {self.end_time}"
    
    class Meta:
        verbose_name_plural = "Doctor Non Availability"

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=14)

    def __str__(self):
        return self.user.username

class PatientDetails(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE)
    age = models.PositiveIntegerField(blank=True)
    gender = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)
    blood_group = models.CharField(max_length=3, blank=True)
    
    def __str__(self):
        return f"{self.patient} - {self.age} years old"
    
    class Meta:
        verbose_name_plural = "Patient Details"

class TimeSlot(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_booked = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.start_time} - {self.end_time}"

    class Meta:
        indexes = [
            models.Index(fields=['start_time']),
            models.Index(fields=['end_time']),
        ]
    

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    time_slot = models.OneToOneField(TimeSlot, on_delete=models.CASCADE)
    reschedule_requested = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"Appointment with {self.doctor} for {self.patient} on {self.date} at {self.time_slot.start_time}"
