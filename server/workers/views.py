from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import viewsets
from .serializer import WorkerSerializer
from .models import Worker

# Create your views here.

class WorkerView(APIView):
    serializer_class = WorkerSerializer
    def get(self, request):
        all_workers = Worker.objects.all()
        return Response({"workers": all_workers})

    def post(self, request):
        serializer = WorkerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)


