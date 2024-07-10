from django.test import TestCase

# Create your tests here.

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


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
    
    def test_login(self):
        data = {
            "username": "example",
            "password": "testtest456"
        }
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_login_with_doctor(self):
        data = {
            "username": "doctor1",
            "password": "testtest456"
        }
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
class LogoutTestCase(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username="example", password="testtest456")
        self.user.save()
        self.doctor_user = User.objects.create_user(username='doctor1', password='testtest456')
        self.doctor_user.save()
    
    # def test_logout(self):
    #     self.token = Token.objects.get(user__username="example")
    #     self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    #     response = self.client.post(reverse('logout'))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK) 
    
    def test_logout(self):
        try:
            if self.token == Token.objects.get(user__username="example"):
                self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
                response = self.client.post(reverse('logout'))
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                
            if self.token == Token.objects.get(user__username="doctor1"):
                self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
                response = self.client.post(reverse('logout'))
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                
        except Token.DoesNotExist:
            self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
      