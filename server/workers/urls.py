from django.urls import path
from .views import WorkerList, WorkerDetail, WorkerSickDateList, WorkerOffDateList
from rest_framework.urlpatterns import format_suffix_patterns

app_name = "workers"

urlpatterns = [
    path('workers/', WorkerList.as_view()),
    path('workers/<int:pk>/', WorkerDetail.as_view()),
    path('workers/sick_dates/', WorkerSickDateList.as_view()),
     path('workers/off_dates/', WorkerOffDateList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)