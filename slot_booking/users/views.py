from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import *
from .models import *


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
            
        else:
            data = serializer.errors
        
        return Response(data, status=status.HTTP_201_CREATED)
