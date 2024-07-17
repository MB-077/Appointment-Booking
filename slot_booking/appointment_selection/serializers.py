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
        appointment_date = self.initial_data.get('date')
        appointment_date_obj = datetime.strptime(appointment_date, '%Y-%m-%d').date()
        
        doctor = self._get_doctor(doctor_id)
        patient = self._get_patient(patient_id)
        time_slot = self._get_time_slot(time_slot_id)
        
        self._validate_doctor_availability(doctor, appointment_date_obj, time_slot)
        self._validate_unique_appointment(time_slot)
        self._validate_patient_doctor_different(doctor, patient)
        
        data['doctor'] = doctor
        data['patient'] = patient
        data['time_slot'] = time_slot
        return data
    
    def _get_doctor(self, doctor_id):
        try:
            return Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            raise serializers.ValidationError({'doctor_id': 'Doctor does not exist.'})

    def _get_patient(self, patient_id):
        try:
            return Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            raise serializers.ValidationError({'patient_id': 'Patient does not exist.'})

    def _get_time_slot(self, time_slot_id):
        try:
            return TimeSlot.objects.get(id=time_slot_id)
        except TimeSlot.DoesNotExist:
            raise serializers.ValidationError({'time_slot_id': 'Time slot does not exist.'})

    def _validate_doctor_availability(self, doctor, appointment_date, time_slot):
        doctor_non_availability = DoctorNonAvailability.objects.filter(doctor=doctor)
        for non_availability in doctor_non_availability:
            if non_availability.start_date <= appointment_date <= non_availability.end_date:
                if non_availability.start_time <= time_slot.start_time and non_availability.end_time >= time_slot.end_time:
                    raise serializers.ValidationError({'doctor': 'Doctor is not available on this date.'})

    def _validate_unique_appointment(self, time_slot):
        if Appointment.objects.filter(time_slot=time_slot).exists():
            raise serializers.ValidationError({'time_slot': 'Time slot already booked.'})

    def _validate_patient_doctor_different(self, doctor, patient):
        if doctor.user.id == patient.user.id:
            raise serializers.ValidationError({'doctor_id': 'Doctor and patient cannot be the same.'})

    def create(self, validated_data):
        time_slot = validated_data['time_slot']
        time_slot.is_booked = True
        time_slot.save(update_fields=['is_booked'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if instance.time_slot != validated_data['time_slot']:
            instance.time_slot.is_booked = False
            instance.time_slot.save(update_fields=['is_booked'])
            validated_data['time_slot'].is_booked = True
            validated_data['time_slot'].save(update_fields=['is_booked'])
        return super().update(instance, validated_data)


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
