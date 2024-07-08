from rest_framework import serializers
from .models import *
from datetime import datetime


class DoctorSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Patient
        fields = '__all__'
    
class PatientDetailsSerializer(serializers.ModelSerializer):
    patient = serializers.CharField(source='patient.user.username', read_only=True)
    patient_id = serializers.IntegerField(write_only=True)
    
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
    is_approved = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Appointment
        fields = '__all__'
    
    def validate(self, data):
        doctor_id = self.initial_data.get('doctor')
        patient_id = self.initial_data.get('patient')
        time_slot_id = self.initial_data.get('time_slot')
        doctor_non_availability = DoctorNonAvailability.objects.filter(doctor=doctor_id)
        appointment_date = self.initial_data.get('date')
        appointment_date_obj = datetime.strptime(appointment_date, '%Y-%m-%d').date()        
        
        try:
            doctor = Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            raise serializers.ValidationError({'doctor_id': 'Doctor does not exist.'})
        
        try:
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            raise serializers.ValidationError({'patient_id': 'Patient does not exist.'})
        
        try:
            time_slot = TimeSlot.objects.get(id=time_slot_id)
        except TimeSlot.DoesNotExist:
            raise serializers.ValidationError({'time_slot_id': 'Time slot does not exist.'})
        
        if Appointment.objects.filter(time_slot=time_slot).exists():
            raise serializers.ValidationError({'time_slot': 'Time slot already booked.'})
        
        if not doctor.user:
            raise serializers.ValidationError({'doctor_id': 'User is not a doctor.'})
        
        if doctor.user.id == patient.user.id:
            raise serializers.ValidationError({'doctor_id': 'Doctor and patient cannot be the same.'})

        if doctor_non_availability.exists():
            for doctor_non_availability in doctor_non_availability:
                if doctor_non_availability.start_date <= appointment_date_obj <= doctor_non_availability.end_date:
                    if doctor_non_availability.start_time <= time_slot.start_time and doctor_non_availability.end_time >= time_slot.end_time:
                        raise serializers.ValidationError({'doctor': 'Doctor is not available on this date.'})
        
        return data
    
    def create(self, validated_data):
        doctor_id = self.initial_data.get('doctor')
        patient_id = self.initial_data.get('patient')
        time_slot_id = self.initial_data.get('time_slot')
    
        doctor = Doctor.objects.get(id=doctor_id)
        patient = Patient.objects.get(id=patient_id)
        time_slot = TimeSlot.objects.get(id=time_slot_id)
    
        validated_data['doctor'] = doctor
        validated_data['patient'] = patient
        validated_data['time_slot'] = time_slot
    
        time_slot.is_booked = True
        time_slot.save()
    
        return Appointment.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.time_slot = validated_data.get('time_slot', instance.time_slot)
        instance.reschedule_requested = validated_data.get('reschedule_requested', instance.reschedule_requested)
        instance.is_approved = validated_data.get('is_approved', instance.is_approved)
        
        instance.save()
        return instance


class DoctorNonAvailabilitySerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='doctor.user.username', read_only=True)
    doctor_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = DoctorNonAvailability
        fields = '__all__'
        extra_kwargs = {'doctor': {'read_only': True}}
        
    def validate(self, data):
        doctor_id = data.get('doctor_id')
        
        try:
            doctor = Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            raise serializers.ValidationError({'doctor_id': 'Doctor does not exist.'})
        
        if not doctor.user:
            raise serializers.ValidationError({'doctor_id': 'User is not a doctor.'})
        
        data['doctor'] = doctor
        
        return data

    def create(self, validated_data):
        validated_data.pop('doctor_id', None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('doctor_id', None)
        return super().update(instance, validated_data)
        
    