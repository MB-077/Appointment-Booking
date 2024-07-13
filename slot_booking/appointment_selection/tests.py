from django.test import TestCase

# Create your tests here.

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import *
from .serializers import *
from datetime import datetime, timedelta
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import json

class TimeSlotTest(APITestCase):
    
    def setUp(self):
        super().setUp()
        TimeSlot.objects.all().delete()
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)  
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.doctor_user = User.objects.create_user(username='doctor1', password='testtest456')
        self.doctor_user.save()
        self.doctor = Doctor.objects.create(user=self.doctor_user, email='doctor@example.com', specialty='General')
        self.doctor.save()
        start_time = (datetime.now() + timedelta(hours=1)).time()
        end_time = (datetime.now() + timedelta(hours=2)).time()
        self.time_slot = TimeSlot.objects.create(doctor=self.doctor, start_time=start_time, end_time=end_time)
        self.data = {'start_time': start_time.isoformat(), 'end_time': end_time.isoformat()}
        self.url = reverse('time_slot_list', kwargs={'pk': self.doctor.id})
        
    def test_get_time_slot_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_time_slot(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_get_time_slot(self):
        response = self.client.get(reverse('time_slot_individual', kwargs={'pk': self.doctor.id, 'time_slot_id': self.time_slot.id}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_update_time_slot(self):
        response = self.client.put(reverse('time_slot_individual', kwargs={'pk': self.doctor.id, 'time_slot_id': self.time_slot.id}), self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_delete_time_slot(self):
        response = self.client.delete(reverse('time_slot_individual', kwargs={'pk': self.doctor.id, 'time_slot_id': self.time_slot.id}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
  
        
class PatientTest(APITestCase):
        
        def setUp(self):
            super().setUp()
            Patient.objects.all().delete()
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
        super().setUp()
        Patient.objects.all().delete()
        PatientDetails.objects.all().delete()
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)  
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.patient = Patient.objects.create(user=self.user, phone_number='1234567890')
        self.patient.save()
        self.url = reverse('patient_details_list')
        
    def test_get_patient_details_list(self):
        self.patient_details = PatientDetails.objects.create(
            patient=self.patient,
            age=20,
            gender="Male",
            address='testaddress',
            blood_group='A+'
            )
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_patient_details(self):
        self.data = {
            'patient_id': self.patient.id,  
            'age': 20,
            'gender': 'Male',  
            'address': 'testaddress',
            'blood_group': 'B+'
        }
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        
class PatientDetailIndividualTest(APITestCase):
    
    def setUp(self):
        super().setUp()
        Patient.objects.all().delete()
        PatientDetails.objects.all().delete()
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
        self.data = {'patient_id': self.patient.id, 'age': 20, 'gender': 'male', 'address': 'testaddress', 'bloodgroup': 'A+'}
        self.url = reverse('patient_details_individual', kwargs={'pk': self.patient_details.id})
            
    def test_get_patient_details(self):
        response = self.client.get(reverse('patient_details_individual', args=[self.patient_details.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_update_patient_details(self):
        self.data = {'patient_id': self.patient.id, 'age': 22, 'gender': 'male', 'address': 'testaddress', 'blood_group': 'A+'}  
        response = self.client.put(reverse('patient_details_individual', args=[self.patient_details.id]), json.dumps(self.data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_delete_patient_details(self):
        response = self.client.delete(reverse('patient_details_individual', args=[self.patient_details.id]))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class DoctorTest(APITestCase):
    
    def setUp(self):
        super().setUp()
        Doctor.objects.all().delete()
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)  
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.doctor_user = User.objects.create_user(username='doctor1', password='testtest456')
        self.doctor_user.save()
        self.doctor = Doctor.objects.create(user=self.doctor_user, email='doctor@example.com', specialty='General')
        self.doctor.save()
        self.data = {'user': self.user.id}
        self.url = reverse('doctor_list')
    
    def test_get_doctor_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_doctor(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
       

class DoctorIndividualTest(APITestCase):
    
    def setUp(self):
        super().setUp()
        Doctor.objects.all().delete()
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.doctor_user = User.objects.create_user(username='doctor1', password='testtest456')
        self.doctor_user.save()
        self.doctor = Doctor.objects.create(user=self.doctor_user, email='doctor@example.com', specialty='General')
        self.doctor.save()
        self.data = {'user': self.user.id}
        self.url = reverse('doctor_individual', kwargs={'pk': self.doctor.id})
        
    def test_get_doctor(self):
        response = self.client.get(reverse('doctor_individual', args=[self.doctor.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_update_doctor(self):
        response = self.client.put(reverse('doctor_individual', args=[self.doctor.id]), self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_delete_doctor(self):
        response = self.client.delete(reverse('doctor_individual', args=[self.doctor.id]))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    
class DoctorNonAvailabilityTest(APITestCase):
    
    def setUp(self):
        super().setUp()
        Doctor.objects.all().delete()
        DoctorNonAvailability.objects.all().delete()
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.doctor_user = User.objects.create_user(username='doctor1', password='testtest456')
        self.doctor_user.save()
        self.doctor = Doctor.objects.create(user=self.doctor_user, email='doctor@example.com', specialty='General')
        self.doctor.save()
        self.doctor_non_availability = DoctorNonAvailability.objects.create(
            doctor=self.doctor,
            start_date=datetime.now(),
            start_time=(datetime.now() + timedelta(hours=1)).time(),
            end_date=datetime.now(),
            end_time=(datetime.now() + timedelta(hours=2)).time()
            )
        self.doctor_non_availability.save()
        self.data = {'doctor': self.doctor.id, 'start_date': datetime.now(), 'start_time': datetime.now(), 'end_date': datetime.now(), 'end_time': datetime.now()}
        self.url = reverse('doctor_non_availability_list', kwargs={'pk': self.doctor.id})
        
    def test_get_doctor_non_availability_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_create_doctor_non_availability(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
        
class DoctorNonAvailabilityIndividualTest(APITestCase):
    
    def setUp(self):
        super().setUp()
        Doctor.objects.all().delete()
        DoctorNonAvailability.objects.all().delete()
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.doctor_user = User.objects.create_user(username='doctor1', password='testtest456')
        self.doctor_user.save()
        self.doctor = Doctor.objects.create(user=self.doctor_user, email='doctor@example.com', specialty='General')
        self.doctor.save()
        self.doctor_non_availability = DoctorNonAvailability.objects.create(
            doctor=self.doctor,
            start_date=datetime.now(),
            start_time=(datetime.now() + timedelta(hours=1)).time(),
            end_date=datetime.now(),
            end_time=(datetime.now() + timedelta(hours=2)).time()
            )
        self.doctor_non_availability.save()
        self.data = {
            'doctor': self.doctor.id,
            'start_date': datetime.now().date().isoformat(),
            'start_time': (datetime.now() + timedelta(hours=1)).time().isoformat(),
            'end_date': datetime.now().date().isoformat(),
            'end_time': (datetime.now() + timedelta(hours=2)).time().isoformat()
            }
        self.url = reverse('doctor_non_availability_individual', kwargs={'pk': self.doctor.id, 'non_availability_id': self.doctor_non_availability.id})
        
    def test_get_doctor_non_availability(self):
        response = self.client.get(reverse('doctor_non_availability_individual', kwargs={'pk': self.doctor.id, 'non_availability_id': self.doctor_non_availability.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_update_doctor_non_availability(self):
        response = self.client.put(reverse('doctor_non_availability_individual', kwargs={'pk': self.doctor.id, 'non_availability_id': self.doctor_non_availability.id}), self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_delete_doctor_non_availability(self):
        response = self.client.delete(reverse('doctor_non_availability_individual', kwargs={'pk': self.doctor.id, 'non_availability_id': self.doctor_non_availability.id}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class AppointmentTest(APITestCase):
    
    def setUp(self):
        super().setUp()
        Doctor.objects.all().delete()
        Patient.objects.all().delete()
        Appointment.objects.all().delete()
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.doctor_user = User.objects.create_user(username='doctor1', password='testtest456')
        self.doctor_user.save()
        self.doctor = Doctor.objects.create(user=self.doctor_user, email='doctor@example.com', specialty='General')
        self.doctor.save()
        self.patient = Patient.objects.create(user=self.user, phone_number='1234567890')
        self.patient.save()
        self.time_slot = TimeSlot.objects.create(doctor=self.doctor ,start_time=(datetime.now() + timedelta(hours=1)).time(), end_time=(datetime.now() + timedelta(hours=2)).time()) 
        self.time_slot.save()
        self.data = {
            'doctor': self.doctor.id,
            'time_slot': self.time_slot.id,
            'patient': self.patient.id,
            'date': datetime.now().date().isoformat(),
            }
        self.url = reverse('appointment_list')
        
    def test_get_appointment_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_appointment(self):
        response = self.client.post(reverse('appointment_list'), json.dumps(self.data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.time_slot.refresh_from_db()
        self.assertTrue(self.time_slot.is_booked)
               

class AppointmentIndividualTest(APITestCase):
    
    def setUp(self):
        super().setUp()
        Doctor.objects.all().delete()
        Patient.objects.all().delete()
        Appointment.objects.all().delete()
        self.user = User.objects.create_user(username='example', password='testtest456')
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.doctor_user = User.objects.create_user(username='doctor1', password='testtest456')
        self.doctor = Doctor.objects.create(user=self.doctor_user, email='doctor@example.com', specialty='General')
        self.patient = Patient.objects.create(user=self.user, phone_number='1234567890')
        self.time_slot = TimeSlot.objects.create(doctor=self.doctor, start_time=(datetime.now() + timedelta(hours=1)).time(), end_time=(datetime.now() + timedelta(hours=2)).time())
        self.time_slot2 = TimeSlot.objects.create(doctor=self.doctor, start_time=(datetime.now() + timedelta(hours=2)).time(), end_time=(datetime.now() + timedelta(hours=3)).time())
        self.appointment = Appointment.objects.create(
            doctor=self.doctor,
            patient=self.patient,
            date=datetime.now().date().isoformat(),
            time_slot=self.time_slot,
            )
        self.appointment.save()
        self.url = reverse('appointment_individual', kwargs={'pk': self.appointment.id})
        
    def test_get_appointment(self):
        response = self.client.get(reverse('appointment_individual', args=[self.appointment.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_update_appointment(self):
        new_time_slot = TimeSlot.objects.create(doctor=self.doctor, start_time=(datetime.now() + timedelta(hours=3)).time(), end_time=(datetime.now() + timedelta(hours=4)).time())
        new_data = {'patient': self.patient.id, 'doctor': self.doctor.id, 'time_slot': new_time_slot.id, 'date': datetime.now().date().isoformat()}
        response = self.client.put(reverse('appointment_individual', args=[self.appointment.id]), json.dumps(new_data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.time_slot.refresh_from_db()
        new_time_slot.refresh_from_db()
        self.assertFalse(self.time_slot.is_booked)
        self.assertTrue(new_time_slot.is_booked)
        
    def test_delete_appointment(self):
        response = self.client.delete(reverse('appointment_individual', args=[self.appointment.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.time_slot.refresh_from_db()
        self.assertFalse(self.time_slot.is_booked)
        
        

        
       
        
            