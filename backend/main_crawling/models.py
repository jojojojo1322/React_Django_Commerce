#-*- coding:utf-8 -*-

from django.db import models
from django.db.models import IntegerField, Model





# Create your models here.
class Crawling(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    title = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    sale = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    img_src = models.URLField()

    detail_guide = models.TextField()
    detail_src = models.TextField(null=True)


    # detail_src = models.ListCharField(
    #     base_field=CharField(max_length=100),
    #     size=6,
    #     null=True
    # )
    
    objects = models.Manager()