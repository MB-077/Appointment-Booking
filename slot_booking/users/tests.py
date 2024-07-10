from django.test import TestCase

# Create your tests here.

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from appointment_selection.models import Patient, Doctor


class RegistrationTestCase(APITestCase):
    
    def test_register(self):
        data = {
            "username": "testcase",
            "email": "testcase@example.com",
            "phone_number": "1234567890",
            "password": "testtest456",
            "password2": "testtest456"
        }
        response = self.client.post(reverse('register'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginTestCase(APITestCase):
    
    def setUp(self):
        super().setUp()
        User.objects.all().delete()
        Patient.objects.all().delete()
        Doctor.objects.all().delete()
        self.user = User.objects.create_user(username="example", password="testtest456")
        self.user.save()
        self.patient = Patient.objects.create(user=self.user, phone_number="1234567890")
        self.patient.save()
        self.user2 = User.objects.create_user(username="doctor1", password="testtest456")
        self.user2.save()
        self.doctor = Doctor.objects.create(user=self.user2, email="doctor1@doctor.com")
        self.doctor.save()
        
    def test_login_patient(self):
        data = {
            "username": "example",
            "password": "testtest456"
        }
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)
        self.assertTrue('patient_id' in response.data)
        self.assertTrue('phone_number' in response.data)
        
    def test_login_doctor(self):
        data = {
            "username": "doctor1",
            "password": "testtest456"
        }
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)
        self.assertTrue('doctor_id' in response.data)
        self.assertTrue('email' in response.data)
                

class LogoutTestCase(APITestCase):
    
    def setUp(self):
        super().setUp()
        User.objects.all().delete()
        Patient.objects.all().delete()
        self.user = User.objects.create_user(username="example", password="testtest456")
        self.patient = Patient.objects.create(user=self.user, phone_number="1234567890")
        self.token = Token.objects.get(user=self.user)
        self.user.save()
    
    def test_login(self):            
        data = {
            "username": "example",
            "password": "testtest456"
        }
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_logout(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(reverse('logout'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
