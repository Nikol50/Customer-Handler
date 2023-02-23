from .models import Worker, SickDate, OffDate
from .serializer import WorkerSerializer, SickDateSerializer, OffDateSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.db import transaction
from typing import List, Tuple


def get_or_create_dates(instance, list_of_dates) -> List[Tuple[str, bool]]:
    """
    Get or create dates in the given instance.

    :return: A list of => <date>,<if_was_created>
    """
    ret_val = []
    for date in list_of_dates:
        ret_val.append(instance.objects.get_or_create(date=date))
    return ret_val


# Delete date if no workers use it (by using list of dates query) 
def delete_unused_dates(instance, list_of_query_dates):
    for date in list_of_query_dates:
        if date.workers.count() == 0:
            date.delete()


class WorkerList(generics.ListCreateAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        with transaction.atomic():
            get_or_create_dates(SickDate, request.data.get("sick_dates", []))
            get_or_create_dates(OffDate, request.data.get("off_dates", []))
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            

class WorkerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        old_sick_dates_query = list(instance.sick_dates.all())  # Casting to list prevent change after updating the instance
        old_off_dates_query = list(instance.off_dates.all())  # Casting to list prevent change after updating the instance
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        with transaction.atomic():
            get_or_create_dates(SickDate, request.data.get("sick_dates", []))
            get_or_create_dates(OffDate, request.data.get("off_dates", []))
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            delete_unused_dates(SickDate, old_sick_dates_query)
            delete_unused_dates(OffDate, old_off_dates_query)

        queryset = self.filter_queryset(self.get_queryset())
        if queryset._prefetch_related_lookups:
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance,
            # and then re-prefetch related objects
            instance._prefetched_objects_cache = {}
            prefetch_related_objects([instance], *queryset._prefetch_related_lookups)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        old_sick_dates_query = list(instance.sick_dates.all())  # Casting to list prevent change after deleting the instance
        old_off_dates_query = list(instance.off_dates.all())  # Casting to list prevent change after updating the instance

        with transaction.atomic():
            self.perform_destroy(instance)
            delete_unused_dates(SickDate, old_sick_dates_query)
            delete_unused_dates(OffDate, old_off_dates_query)

        return Response(status=status.HTTP_204_NO_CONTENT)



class WorkerSickDateList(generics.ListAPIView):
    queryset = SickDate.objects.all()
    serializer_class = SickDateSerializer


class WorkerOffDateList(generics.ListAPIView):
    queryset = OffDate.objects.all()
    serializer_class = OffDateSerializer
