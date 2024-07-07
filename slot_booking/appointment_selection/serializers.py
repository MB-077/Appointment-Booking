from rest_framework import serializers
from .models import *


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Patient
        fields = '__all__'
    
class PatientDetailsSerializer(serializers.ModelSerializer):
    patient = serializers.CharField(source='patient.user.username', read_only=True)
    
    class Meta:
        model = PatientDetails
        fields = '__all__'

class TimeSlotSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TimeSlot
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='doctor.user.username', read_only=True)
    patient = serializers.CharField(source='patient.user.username', read_only=True)
    time_slot = serializers.PrimaryKeyRelatedField(queryset=TimeSlot.objects.all())
    
    class Meta:
        model = Appointment
        fields = '__all__'
        
class DoctorNonAvailabilitySerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='doctor.user.username', read_only=True)
    
    class Meta:
        model = DoctorNonAvailability
        fields = '__all__'
        
    