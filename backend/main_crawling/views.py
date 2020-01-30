from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status

from .serializers import CrawlingSerializer
from .models import Crawling

from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated ,AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes




@permission_classes((AllowAny, ))
class CrawlingView(viewsets.ModelViewSet):
    queryset = Crawling.objects.all()
    serializer_class = CrawlingSerializer
