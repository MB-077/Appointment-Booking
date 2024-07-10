from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status
from .serializers import *
from appointment_selection.models import *


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        data = {
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
        }
        
        if hasattr(user, 'patient'):
            data.update({
                'patient_id': user.patient.id,
                'phone_number': user.patient.phone_number,
            })
            return Response(data, status=status.HTTP_200_OK)
        elif hasattr(user, 'doctor'):
            data.update({
                'doctor_id': user.doctor.id,
                'doctor_email': user.doctor.email,
            })
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'error': 'User does not have an associated patient or doctor profile.',
            }, status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['POST',])
def logout_view(request):
    
    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(['POST',])
def registration_view(request):
    
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        
        data = {}
        
        if serializer.is_valid():
            account, patient = serializer.save()
            data['response'] = 'Registration Successfully!'
            data['id'] = account.id
            data['username'] = account.username
            data['email'] = account.email
            data['phone_no'] = patient.phone_number
            
            token = Token.objects.get(user=account).key
            data['token'] = token
            
            data['patient_id'] = patient.id
        else:
            data = serializer.errors
        
        return Response(data, status=status.HTTP_201_CREATED)
