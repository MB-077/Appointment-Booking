from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class TimeSlotList(ListCreateAPIView):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        elif self.request.method == 'POST':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class TimeSlotIndividual(RetrieveUpdateDestroyAPIView):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
    permission_classes = [IsAdminUser]
    
    
class PatientList(ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        elif self.request.method == 'POST':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]    


class PatientDetailList(ListCreateAPIView):
    queryset = PatientDetails.objects.all()
    serializer_class = PatientDetailsSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else :
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
    
    
class PatientDetailIndividual(RetrieveUpdateDestroyAPIView):
    queryset = PatientDetails.objects.all()
    serializer_class = PatientDetailsSerializer
   
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else :
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class DoctorList(ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else :
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
    
    
class DoctorIndividual(RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else :
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
    
    
class DoctorNonAvailabilityList(ListCreateAPIView):
    queryset = DoctorNonAvailability.objects.all()
    serializer_class = DoctorNonAvailabilitySerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else :
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class DoctorNonAvailabilityIndividual(RetrieveUpdateDestroyAPIView):
    queryset = DoctorNonAvailability.objects.all()
    serializer_class = DoctorNonAvailabilitySerializer
   
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else :
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
    
    
class AppointmentList(ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
        
    
class AppointmentIndividual(RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    