from django.contrib.auth.models import User
from rest_framework import serializers
from appointment_selection.models import Patient

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    phone_number = serializers.CharField(max_length=14)
    
    class Meta:
        model = User
        fields = ['username', 'phone_number', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}, 'phone_number': {'write_only': True, 'required': True}}
        
    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        
        if User.objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError({'email': 'Email already exists.'})
        
        account = User(email=self.validated_data['email'], username=self.validated_data['username'])
        account.set_password(password)
        account.save()
        
        account2 = Patient(phone_number=self.validated_data['phone_number'], user=account)
        account2.save()
        
        return account, account2