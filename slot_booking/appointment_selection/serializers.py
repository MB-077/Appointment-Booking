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
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        time_slot_instance = TimeSlot.objects.get(pk=representation['time_slot'])
        representation['time_slot'] = TimeSlotSerializer(time_slot_instance).data
        return representation
    
    def create(self, validated_data):
        doctor_id = self.initial_data.get('doctor_id')
        time_slot_id = self.initial_data.get('time_slot_id')
        patient_id = self.initial_data.get('patient_id')

        if doctor_id:
            validated_data['doctor'] = Doctor.objects.get(id=doctor_id)
        if patient_id:
            validated_data['patient'] = Patient.objects.get(id=patient_id)
        if time_slot_id:
            validated_data['time_slot'] = TimeSlot.objects.get(id=time_slot_id)

        return Appointment.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.time_slot = validated_data.get('time_slot', instance.time_slot)
        instance.reschedule_requested = validated_data.get('reschedule_requested', instance.reschedule_requested)
        instance.is_approved = validated_data.get('is_approved', instance.is_approved)
        
        instance.save()
        return instance

    
class DoctorNonAvailabilitySerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='doctor.user.username', read_only=True)
    
    class Meta:
        model = DoctorNonAvailability
        fields = '__all__'
        
    