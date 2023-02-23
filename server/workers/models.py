import datetime
from django.core import exceptions, checks
from django.db import models
from django_mysql.models.fields.lists import ListFieldMixin
from django.db.models import CharField, DateField
from typing import Any, List

class Worker(models.Model):
    id = models.CharField(max_length=9, primary_key=True, blank=False)
    first_name = models.CharField(max_length=120, null=False, blank=False)
    last_name = models.CharField(max_length=120, null=False, blank=False)
    address = models.CharField(max_length=120)
    phone_num = models.CharField(max_length=20)
    start_date = models.DateField(null=True, blank=False)

    def _str_(self):
        return self.id


class SickDate(models.Model):
    workers = models.ManyToManyField(Worker, related_name="sick_dates", blank=True)
    date = models.DateField(primary_key=True, blank=False)

    def _str_(self):
        return self.date

class OffDate(models.Model):
    workers = models.ManyToManyField(Worker, related_name="off_dates", blank=True)
    date = models.DateField(primary_key=True, blank=False)
    
    def _str_(self):
        return self.date