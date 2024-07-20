from django.shortcuts import render

# Create your views here.

from .models import *
from .serializers import *
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import ValidationError
from rest_framework import mixins, viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from datetime import datetime



class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class PermissionMixin:
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class TimeSlotList(PermissionMixin, ListCreateAPIView):
    serializer_class = TimeSlotSerializer
    
    def get_queryset(self):
        doctor_id = self.kwargs.get('pk')
        return TimeSlot.objects.filter(doctor_id=doctor_id)
    

class TimeSlotIndividual(RetrieveUpdateDestroyAPIView):
    serializer_class = TimeSlotSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        doctor_id = self.kwargs.get('pk')
        time_slot_id = self.kwargs.get('time_slot_id')
        try:
            return TimeSlot.objects.get(doctor_id=doctor_id, id=time_slot_id)
        except TimeSlot.DoesNotExist:
            raise ValidationError("No TimeSlot matches the given query.")
        
    def get_queryset(self):
        doctor_id = self.kwargs.get('pk')
        time_slot_id = self.kwargs.get('time_slot_id')
        return TimeSlot.objects.get(doctor_id=doctor_id, id=time_slot_id)
    
class PatientList(PermissionMixin, ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer  


class PatientDetailList(ListCreateAPIView):
    queryset = PatientDetails.objects.all()
    serializer_class = PatientDetailsSerializer
    permission_classes = [IsAuthenticated]

    
class PatientDetailIndividual(RetrieveUpdateDestroyAPIView):
    queryset = PatientDetails.objects.all()
    serializer_class = PatientDetailsSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'POST':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminOrReadOnly]
        return [permission() for permission in permission_classes]
    

class DoctorList(PermissionMixin, ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    
    
class DoctorIndividual(PermissionMixin, RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    
    
class DoctorNonAvailabilityList(PermissionMixin, ListCreateAPIView):
    queryset = DoctorNonAvailability.objects.all()
    serializer_class = DoctorNonAvailabilitySerializer
    

class DoctorNonAvailabilityIndividual(PermissionMixin, RetrieveUpdateDestroyAPIView):
    serializer_class = DoctorNonAvailabilitySerializer
    
    def perform_update(self, serializer):
        if 'doctor' in self.request.data and not self.request.user.is_staff:
            raise PermissionDenied("Only admins can update the 'doctor' field.")
        serializer.save()

    def get_object(self):
        doctor_id = self.kwargs.get('pk')
        non_availability_id = self.kwargs.get('non_availability_id')
        try:
            return DoctorNonAvailability.objects.get(doctor_id=doctor_id, id=non_availability_id)
        except DoctorNonAvailability.DoesNotExist:
            raise ValidationError("No Doctor Non Availability matches the given query.")
        
    def get_queryset(self):
        doctor_id = self.kwargs.get('pk')
        non_availability_id = self.kwargs.get('non_availability_id')
        return DoctorNonAvailability.objects.get(doctor_id=doctor_id, id=non_availability_id)
    

class AppointmentList(ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    
    
class AppointmentIndividual(RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_update(self, serializer):
        if 'is_approved' in self.request.data and not self.request.user.is_staff:
            raise PermissionDenied("Only admins can update the 'is_approved' field.")
        serializer.save()


class PastAppointmentList(ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        patient_id = self.kwargs.get('pk')
        return Appointment.objects.filter(patient_id=patient_id, date__lt=datetime.date(datetime.now()))