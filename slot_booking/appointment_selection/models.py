from django.db import models

# Create your models here.

from django.contrib.auth.models import User
from datetime import datetime
from datetime import timedelta

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField()
    specialty = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username

class DoctorNonAvailability(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    day = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.doctor} is not available on {self.day} from {self.start_time} to {self.end_time}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save DoctorNonAvailability first
        
        # Create TimeSlot objects for the availability
        slots = []
        start_time = datetime.combine(self.day, self.start_time)
        end_time = datetime.combine(self.day, self.end_time)
        
        while start_time < end_time:
            slot_end_time = start_time + timedelta(minutes=60)
            if slot_end_time > end_time:
                break
            slots.append(TimeSlot(start_time=start_time.time(), end_time=slot_end_time.time()))
            start_time = slot_end_time
        
        TimeSlot.objects.bulk_create(slots)
    
    def delete(self, *args, **kwargs):
        # Delete the related TimeSlot objects
        TimeSlot.objects.filter(start_time__gte=self.start_time, end_time__lte=self.end_time).delete()
        super().delete(*args, **kwargs)

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=14)

    def __str__(self):
        return self.user.username

class PatientDetails(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=50)
    address = models.TextField()
    blood_group = models.CharField(max_length=3, blank=True)
    email = models.EmailField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.patient} - {self.age} years old"

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
    
    def save(self, *args, **kwargs):
        # Update the is_booked field of the related TimeSlot
        self.time_slot.is_booked = True
        self.time_slot.save()
        super().save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        # Reset the is_booked field of the related TimeSlot
        self.time_slot.is_booked = False
        self.time_slot.save()
        super().delete(*args, **kwargs)