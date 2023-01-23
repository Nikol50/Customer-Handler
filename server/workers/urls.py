from django.urls import path
from .views import WorkerView


app_name = "workers"

urlpatterns = [path('workers/', WorkerView.as_view()),]