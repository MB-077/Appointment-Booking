from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'timeslots', TimeSlotViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('register-patient/', RegisterPatientView.as_view(), name='register-patient'),
]