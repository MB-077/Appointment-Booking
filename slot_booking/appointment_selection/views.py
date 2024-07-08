from django.shortcuts import render

# Create your views here.

from .models import *
from .serializers import *
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import ValidationError
from rest_framework import mixins, viewsets, permissions
from rest_framework.exceptions import PermissionDenied

class PermissionMixin:
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class TimeSlotList(PermissionMixin, ListCreateAPIView):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer


class TimeSlotIndividual(RetrieveUpdateDestroyAPIView):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
    permission_classes = [IsAdminUser]
    
    
class PatientList(PermissionMixin, ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer  


class PatientDetailList(PermissionMixin, ListCreateAPIView):
    queryset = PatientDetails.objects.all()
    serializer_class = PatientDetailsSerializer

    
class PatientDetailIndividual(PermissionMixin, RetrieveUpdateDestroyAPIView):
    queryset = PatientDetails.objects.all()
    serializer_class = PatientDetailsSerializer
    

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
    queryset = DoctorNonAvailability.objects.all()
    serializer_class = DoctorNonAvailabilitySerializer
    
    def perform_update(self, serializer):
        if 'doctor' in self.request.data and not self.request.user.is_staff:
            raise PermissionDenied("Only admins can update the 'doctor' field.")
        serializer.save()
        
   
class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


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
