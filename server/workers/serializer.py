from rest_framework import serializers
from .models import Worker, SickDate, OffDate

class OffDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OffDate
        fields = ('workers', 'date')

class SickDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SickDate
        fields = ('workers', 'date')
            
class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ('id', 'first_name', 'last_name', 'address',
        'phone_num','start_date', 'sick_dates','off_dates') 


