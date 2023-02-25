from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.db import models


def validate_id_length(value):
    if not len(value) == 9:
        raise ValidationError("ID must have 9 digits!")


def validate_id_is_a_number(value):
    if not value.isdigit():
        raise ValidationError("ID should have only digits!")


class SickDate(models.Model):
    date = models.DateField(primary_key=True, blank=False)

    def __str__(self):
        return str(self.date)


class OffDate(models.Model):
    date = models.DateField(primary_key=True, blank=False)

    def __str__(self):
        return str(self.date)


class Worker(models.Model):
    id = models.CharField(max_length=9, primary_key=True, blank=False,
                          validators=[validate_id_length, validate_id_is_a_number])
    first_name = models.CharField(max_length=120, null=False, blank=False)
    last_name = models.CharField(max_length=120, null=False, blank=False)
    address = models.CharField(max_length=120)
    phone_num = models.CharField(max_length=20, validators=[
        RegexValidator(regex=r'^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$',
                       message="Phone number is invalid")
    ])
    start_date = models.DateField(null=True, blank=False)
    sick_dates = models.ManyToManyField(SickDate, related_name="workers", blank=True)
    off_dates = models.ManyToManyField(OffDate, related_name="workers", blank=True)

    def __str__(self):
        return self.id
