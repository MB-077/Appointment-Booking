from django.shortcuts import render, redirect

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status
from .serializers import *
from appointment_selection.models import *

from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage, BadHeaderError
from django.contrib.auth.models import User

import logging

logger = logging.getLogger(__name__)

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
                'email': user.doctor.email,
            })
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'error': 'User does not have an associated patient or doctor profile.',
            }, status=status.HTTP_400_BAD_REQUEST)
            
    def remember_me(self, request, response):
        remember_me = request.data.get('remember_me')
        if remember_me:
            response.set_cookie('username', request.data.get('username'), max_age=604800)
            response.set_cookie('password', request.data.get('password'), max_age=604800)
        else:
            response.delete_cookie('username')
            response.delete_cookie('password')
        return response
        
        
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


@api_view(['POST','PUT', 'GET'])
def change_password(request):
    if request.method == 'PUT':
        user = request.user
        current_password = request.data['current_password']
        new_password = request.data['new_password']
        new_password_confirm = request.data['new_password_confirm']
        
        if new_password != new_password_confirm:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.check_password(current_password):
            user.set_password(new_password_confirm)
            user.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])
def forgotPassword(request):
    if request.method == "POST":
        email = request.data.get('email')
        
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email__iexact=email)
            current_site = get_current_site(request)
            mail_subject = 'Reset your password'
            message = render_to_string('users/reset_password_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })
            to_email = email
            try:
                send_email = EmailMessage(mail_subject, message, to=[to_email])
                send_email.send()
                return Response({'message': 'Password reset email has been sent to your email address.'}, status=status.HTTP_200_OK)
            except BadHeaderError:
                return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Account does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
    return Response({'message': 'Forgot Password Complete'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def resetpassword_validate(request, uidb64, token):
    logger.debug(f"Received request: {request.method} {request.path}")
    logger.debug(f"UID: {uidb64}, Token: {token}")

    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        logger.debug(f"Decoded UID: {uid}")
        user = User.objects.get(pk=uid)
        if user is not None and default_token_generator.check_token(user, token):
            request.session['uid'] = uid
            return Response({'message': 'Valid link', 'uid': uid, 'token': token}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Link has expired or is invalid'}, status=status.HTTP_400_BAD_REQUEST)
        
    except(TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
        user = None
        logger.error(f"Exception occurred: {str(e)}")
        return Response({'error': 'User not found or invalid UID'}, status=status.HTTP_404_NOT_FOUND)
        
    

@api_view(['POST'])   
def reset_password(request):
    if request.method == "POST":
        data = request.data  # Parse JSON data
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        uid = data.get('uid')

        if password and confirm_password:
            if password == confirm_password:
                # uid = request.session.get('uid')
                print("getting the uid",uid)
                if uid:
                    try:
                        user = User.objects.get(pk=uid)
                        user.set_password(password)
                        user.save()
                        return Response({'message': 'Password reset successful'}, status=status.HTTP_200_OK)
                    except User.DoesNotExist:
                        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Password and confirm password are required'}, status=status.HTTP_400_BAD_REQUEST)


