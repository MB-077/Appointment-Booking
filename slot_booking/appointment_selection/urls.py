from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointments')

urlpatterns = [
    path('', include(router.urls)),
    path('timeslots/', TimeSlotList.as_view(), name='time_slot_list'),
    path('timeslots/<int:pk>/', TimeSlotIndividual.as_view(), name='time_slot_individual'),
    path('patients/', PatientList.as_view(), name='patient_list'),
    path('patients-detail/', PatientDetailList.as_view(), name='patient_details_list'),
    path('patients-detail/<int:pk>/', PatientDetailIndividual.as_view(), name='patient_details_individual'),
]