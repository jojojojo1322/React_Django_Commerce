# api/serializers.py
from rest_framework import serializers
from .models import Post, Comment
from user.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)


    class Meta:
        model = Comment
        fields = (
        'user',
        'post',
        'id',
        'content',
        )
        read_only_fields = ('created_at',)


class PostSerializer(serializers.HyperlinkedModelSerializer):
    comments = CommentSerializer(
        source='comment_set', many=True, read_only=True)
    user = UserSerializer(read_only=True)

    
    class Meta:
        model = Post
        fields = (
            'url',
            'user',
            'id',
            'title',
            'content',
            'comments',
            'created_at',
        )
        read_only_fields = ('created_at',)