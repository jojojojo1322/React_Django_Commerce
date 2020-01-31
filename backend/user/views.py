from rest_framework import status
from rest_framework.decorators import api_view,permission_classes, authentication_classes
from rest_framework.response import Response
from rest_auth.registration.views import RegisterView 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.shortcuts import get_object_or_404

from django.http import HttpResponseRedirect

from .models import User
from .serializers import UserSerializer
# fb
from rest_framework import generics, permissions, views
from requests.exceptions import HTTPError

# from social_django.utils import load_strategy, load_backend
# from social_core.backends.oauth import BaseOAuth2
# from social_core.exceptions import MissingBackend, AuthTokenError, AuthForbidden
from . import serializers

from django.contrib.auth import authenticate, login
from rest_framework_jwt import utils

from rest_framework.generics import RetrieveAPIView

class CustomRegisterView(RegisterView):
    queryset = User.objects.all()


@api_view()
def null_view(request):
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view()
def complete_view(request):
    return Response("Email account is activated")

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# class SocialLoginView(generics.GenericAPIView):
#     """Log in using facebook"""
#     serializer_class = serializers.SocialSerializer
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         """Authenticate user through the provider and access_token"""
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         provider = serializer.data.get('provider', None)
#         strategy = load_strategy(request)

#         try:
#             backend = load_backend(strategy=strategy, name=provider,
#                                    redirect_uri=None)

#         except MissingBackend:
#             return Response({'error': 'Please provide a valid provider'},
#                             status=status.HTTP_400_BAD_REQUEST)
#         try:
#             if isinstance(backend, BaseOAuth2):
#                 access_token = serializer.data.get('access_token')
#             user = backend.do_auth(access_token)
#         except HTTPError as error:
#             return Response({
#                 "error": {
#                     "access_token": "Invalid token",
#                     "details": str(error)
#                 }
#             }, status=status.HTTP_400_BAD_REQUEST)
#         except AuthTokenError as error:
#             return Response({
#                 "error": "Invalid credentials",
#                 "details": str(error)
#             }, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             authenticated_user = backend.do_auth(access_token, user=user)

#         except HTTPError as error:
#             return Response({
#                 "error": "invalid token",
#                 "details": str(error)
#             }, status=status.HTTP_400_BAD_REQUEST)

#         except AuthForbidden as error:
#             return Response({
#                 "error": "invalid token",
#                 "details": str(error)
#             }, status=status.HTTP_400_BAD_REQUEST)

#         if authenticated_user and authenticated_user.is_active:
#             # generate JWT token
#             login(request, authenticated_user)
#             data = {
#                 "token": utils.jwt_encode_handler(
#                     utils.jwt_payload_handler(user)
#                 )}
#             # customize the response to your needs
#             response = {
#                 "email": authenticated_user.email,
#                 "name": authenticated_user.name,
#                 "token": data.get('token')
#             }
#             return Response(status=status.HTTP_200_OK, data=response)






@authentication_classes((JSONWebTokenAuthentication,))
class UserEditProfile(APIView):
    # authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]


    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoseNotExist:
         raise Http404


    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = serializers.UserEditSerializer(user)
        return Response(serializer.data)
    
    
    def put(self, request, pk , format=None):
        user = self.get_object(pk)
        serializer = serializers.UserEditSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk , format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
