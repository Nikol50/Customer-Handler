from django.shortcuts import render, get_object_or_404
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
        serializer = WorkerSerializer(all_workers, many=True)
        return Response({"workers": serializer.data})

    def post(self, request):
        serializer = WorkerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)

    # def put(self, request, *args, **kwargs):
    #     pk = self.kwargs.get('pk')
    #     print(pk)
    #     saved_worker = get_object_or_404(Worker.objects.all(), pk=pk)
    #     data = request.data.get('worker') 
    #     serializer = WorkerSerializer(instance=saved_worker, data=data, partial=True)
    #     if serializer.is_valid(raise_exception=True):
    #         saved_worker = serializer.save()
    #         return  Response({"success": f"Worker {saved_worker.data} was saved!"})

    # def delete(self, request, *args, **kwargs):
    #     pk = self.kwargs.get('pk')
    #     worker = get_object_or_404(Worker.objects.all(), pk=pk)
    #     worker.delete()
    #     return Response("deletes")       
 
    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = WorkerSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



