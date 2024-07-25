from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from django.urls import re_path
from . import views

urlpatterns = [
    # path('login/', obtain_auth_token, name='login'),  
    path('register/', views.registration_view, name='register'),  
    path('logout/', views.logout_view, name='logout'),
    path('login/', views.CustomAuthToken.as_view(), name='login'),
    path('forgot_password/', views.forgotPassword, name='forgot_password'),
    path('resetpassword_validate/<str:uidb64>/<str:token>/', views.resetpassword_validate, name='resetpassword_validate'),
    re_path(r'^resetpassword_validate/(?P<uidb64>[^/]+)/(?P<token>[^/]+)/?$', views.resetpassword_validate, name='resetpassword_validate'),
    path('reset_password/', views.reset_password, name='reset_password'),
    path('change_password/', views.change_password, name='change_password'),
]