from django.urls import path
from .views import *


urlpatterns = [
    path('timeslots/', TimeSlotList.as_view(), name='time_slot_list'),
    path('timeslots/<int:pk>/', TimeSlotIndividual.as_view(), name='time_slot_individual'),
    path('patients/', PatientList.as_view(), name='patient_list'),
    path('patients-detail/', PatientDetailList.as_view(), name='patient_details_list'),
    path('patients-detail/<int:pk>/', PatientDetailIndividual.as_view(), name='patient_details_individual'),
    path('doctors/', DoctorList.as_view(), name='doctor_list'),
    path('doctors/<int:pk>/', DoctorIndividual.as_view(), name='doctor_individual'),
    path('doctor-non-availability/', DoctorNonAvailabilityList.as_view(), name='doctor_non_availability_list'),
    path('doctor-non-availability/<int:pk>/', DoctorNonAvailabilityIndividual.as_view(), name='doctor_non_availability_individual'),
    path('appointments/', AppointmentList.as_view(), name='appointment_list'),
    path('appointments/<int:pk>/', AppointmentIndividual.as_view(), name='appointment_individual'),
]