from django.urls import path
from .views import *


urlpatterns = [
    path('patients/', PatientList.as_view(), name='patient_list'),
    path('patients-detail/', PatientDetailList.as_view(), name='patient_details_list'),
    path('patients-detail/<int:pk>/', PatientDetailIndividual.as_view(), name='patient_details_individual'),
    path('doctors/', DoctorList.as_view(), name='doctor_list'),
    path('doctors/<int:pk>/', DoctorIndividual.as_view(), name='doctor_individual'),
    path('doctors/<int:pk>/timeslots/', TimeSlotList.as_view(), name='time_slot_list'),
    path('doctors/<int:pk>/timeslots/<int:time_slot_id>/', TimeSlotIndividual.as_view(), name='time_slot_individual'),
    path('doctors/<int:pk>/doctor-non-availability/', DoctorNonAvailabilityList.as_view(), name='doctor_non_availability_list'),
    path('doctors/<int:pk>/doctor-non-availability/<int:non_availability_id>/', DoctorNonAvailabilityIndividual.as_view(), name='doctor_non_availability_individual'),
    path('appointments/', AppointmentList.as_view(), name='appointment_list'),
    path('appointments/<int:pk>/', AppointmentIndividual.as_view(), name='appointment_individual'),
    path('patients/<int:pk>/past-appointments/', PastAppointmentList.as_view(), name='past_appointment_list'),
]