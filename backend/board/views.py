# api/views.py
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from user.models import User

class Mypagination(PageNumberPagination):
    PAGE_SIZE = 5



@permission_classes((IsAuthenticated, ))
@authentication_classes((JSONWebTokenAuthentication,))
class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = Mypagination
    
    
    def perform_create(self, serializer):
       serializer.save(user=self.request.user)

@permission_classes((IsAuthenticated, ))
@authentication_classes((JSONWebTokenAuthentication,))
class CommentList(APIView):


    def post(self, request, pk, format=None):
        serializer = CommentSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save(post=Post.objects.get(pk=pk),
                            user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        queryset = Comment.objects.filter(post_id=pk)
        serializer = CommentSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


@permission_classes((IsAuthenticated, ))
@authentication_classes((JSONWebTokenAuthentication,))
class CommentDetail(APIView):
    def get_object(self, post_pk, comment_pk):
        try:
            return Comment.objects.get(post_id=post_pk, pk=comment_pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, post_pk, comment_pk):
        comment = self.get_object(post_pk, comment_pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    def put(self, request, post_pk, comment_pk, format=None):
        comment = self.get_object(post_pk, comment_pk)
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(Serializer.data)
        return Response(serializer.errors, Status=status.HTTP_400_BAD_REQUEST)

    def delete(self, requst, post_pk, comment_pk, format=None):
        comment = self.get_object(post_pk, comment_pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)