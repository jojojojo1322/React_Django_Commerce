from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from rest_framework import routers

from django.conf import settings

# import online.views
import user.views
import user.urls
from rest_framework_jwt.views import obtain_jwt_token ,verify_jwt_token



from rest_auth.registration.views import RegisterView
from allauth.account.views import ConfirmEmailView

# router = routers.DefaultRouter()
# router.register('wisesaying', online.views.WiseSayingView, 'wisesaying'),






urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(router.urls)),
    path('auth/', include('user.urls')),
    # path('api/auth/oauth/', include('rest_framework_social_oauth2.urls')),
    #jwt auth
    path('auth-token/', obtain_jwt_token),
    path('auth-token/verify/', verify_jwt_token),


    #board 
    path('board/', include('board.urls')),
   
   #main_crawling
    path('main/', include('main_crawling.urls')),


    

    
   

    

        
]