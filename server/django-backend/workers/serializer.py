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


def validate_sick_and_off_date_are_not_colliding(data):
    sick_dates = set(map(lambda date: str(date), data['sick_dates']))
    off_dates = set(map(lambda date: str(date), data['off_dates']))
    if sick_dates & off_dates:
        raise serializers.ValidationError("Worker can't have sick and off days on the same day!")


def validate_start_date_before_or_on_sick_and_off_date(data):
    start_date = data['start_date']
    if start_date is None:
        return

    start_date = str(start_date)
    for date in data['sick_dates'] + data['off_dates']:
        if str(date) < start_date:
            raise serializers.ValidationError("Worker can't have sick or off days before start day!")


class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ('id', 'first_name', 'last_name', 'address',
                  'phone_num', 'start_date', 'sick_dates', 'off_dates')
        validators = [
            validate_sick_and_off_date_are_not_colliding,
            validate_start_date_before_or_on_sick_and_off_date
        ]

    def validate_off_dates(self, off_dates):
        if len(off_dates) > 20:
            raise serializers.ValidationError("Worker can't have more than 20 off days!")
        return off_dates
