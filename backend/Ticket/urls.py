#backend/djangoreactapi/urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from rest_framework import routers

from django.conf import settings
from rest_framework_jwt.views import obtain_jwt_token ,verify_jwt_token



from rest_auth.registration.views import RegisterView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('board.urls')),
    path('auth-token/', obtain_jwt_token),
    path('auth-token/verify/', verify_jwt_token),
]