from django.test import TestCase

# Create your tests here.

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import *
from .serializers import *
from datetime import datetime
from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class TimeSlotTest(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)  
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.time_slot = TimeSlot.objects.create(start_time=datetime.now(), end_time=datetime.now())
        self.time_slot.save()
        self.data = {'start_time': datetime.now(), 'end_time': datetime.now()}
        self.url = reverse('time_slot_list')
        
    def test_get_time_slot_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_create_time_slot(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_get_time_slot(self):
        response = self.client.get(reverse('time_slot_individual', args=[self.time_slot.id]))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_update_time_slot(self):
        response = self.client.put(reverse('time_slot_individual', args=[self.time_slot.id]), self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_delete_time_slot(self):
        response = self.client.delete(reverse('time_slot_individual', args=[self.time_slot.id]))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
class PatientTest(APITestCase):
        
        def setUp(self):
            self.user = User.objects.create_user(username='example', password='testtest456')
            self.token, _ = Token.objects.get_or_create(user=self.user)  
            self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
            self.patient = Patient.objects.create(user=self.user, phone_number='1234567890')
            self.patient.save()
            self.data = {'user': self.user.id, 'phone_number': '1234567890'}
            self.url = reverse('patient_list')
            
        def test_get_patient_list(self):
            response = self.client.get(self.url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            
        def test_create_patient(self):
            response = self.client.post(self.url, self.data)
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
            
class PatientDetailsTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)  
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.patient = Patient.objects.create(user=self.user, phone_number='1234567890')
        self.patient.save()
        self.patient_details = PatientDetails.objects.create(
            patient=self.patient,
            age=20,
            gender="Male",
            address='testaddress',
            blood_group='A+'
            )
        self.patient_details.save()
        self.data = {'patient': self.patient.id, 'age': 20, 'gender': 'male', 'address': 'testaddress', 'bloodgroup': 'A+'}
        self.url = reverse('patient_details_list')
        
    def test_get_patient_details_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_create_patient_details(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
        
class PatientDetailIndividualTest(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)  
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.patient = Patient.objects.create(user=self.user, phone_number='1234567890')
        self.patient.save()
        self.patient_details = PatientDetails.objects.create(
            patient=self.patient,
            age=20,
            gender="Male",
            address='testaddress',
            blood_group='A+'
            )
        self.patient_details.save()
        self.data = {'patient': self.patient.id, 'age': 20, 'gender': 'male', 'address': 'testaddress', 'bloodgroup': 'A+'}
        self.url = reverse('patient_details_individual', kwargs={'pk': self.patient_details.id})
            
    def test_get_patient_details(self):
        response = self.client.get(reverse('patient_details_individual', args=[self.patient_details.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_update_patient_details(self):
        response = self.client.put(reverse('patient_details_individual', args=[self.patient_details.id]), self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_delete_patient_details(self):
        response = self.client.delete(reverse('patient_details_individual', args=[self.patient_details.id]))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
        
            
