from django.db import models

# Create your models here.


class Date(models.Model):
    date = models.DateTimeField(primary_key=True, blank=False)


class Worker(models.Model):
    id = models.CharField(max_length=9, primary_key=True, blank=False)
    first_name = models.CharField(max_length=120, null=False, blank=False)
    last_name = models.CharField(max_length=120, null=False, blank=False)
    address = models.CharField(max_length=120)
    phone_num = models.CharField(max_length=20)
    start_date = models.ManyToManyField(Date, related_name='start_date')
    sick_dates = models.ManyToManyField(Date, related_name='sick_dates')
    off_dates = models.ManyToManyField(Date, related_name='off_dates')
    
    def _str_(self):
        return self.id

      