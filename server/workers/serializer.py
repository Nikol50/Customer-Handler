from rest_framework import serializers
from .models import Worker

class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ('id', 'first_name', 'last_name', 'address',
        'phone_num','start_date','sick_dates','off_dates') 
        