from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from . import views

urlpatterns = [
    # path('login/', obtain_auth_token, name='login'),  
    path('register/', views.registration_view, name='register'),  
    path('logout/', views.logout_view, name='logout'),
    path('login/', views.CustomAuthToken.as_view(), name='login'),
]