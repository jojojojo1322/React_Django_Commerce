from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from user.models import User

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=144)
    
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, blank=True, on_delete=models.CASCADE)
    
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

 
    def __str__(self):
        return '%s -%s'%(self.user,self.content)