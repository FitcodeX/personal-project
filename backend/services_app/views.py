from django.shortcuts import render
from rest_framework.views import APIView, Response
from django.core.serializers import serialize

from .models import Services
import json

# Create your views here.
class AllServices(APIView):

    def get(self, request):
        services = Services.objects.order_by('service_id')
        serialized_services = serialize('json', services)
        json_services = json.loads(serialized_services)
        return Response(json_services)
    
class SelectedService(APIView):

    def get(self, request, id):
        service = Services.objects.get(service_id= id)
        serialized_service = serialize('json', [service])
        json_service = json.loads(serialized_service)[0]
        return Response(json_service)
    
    def delete(self, request, id):
        service = Services.objects.get(service_id= id)
        service_id = service.service_id
        service.delete()
        return Response(f'{service_id} has been deleted.')
    
    def put(self, request, id):
        service = Services.objects.get(service_id= id)
        if 'updated_price' in request.data:
            service.updated_price(request.data['updated_price'])
        service.full_clean()
        service.save()
        serialized_service = json.loads(serialize('json', [service]))
        return Response(serialized_service)
    
class CreateService(APIView):

        def post(self, request):
            new_service = Services.objects.create(**request.data)
            new_service.full_clean()
            new_service.save()
            serialized_newService = json.loads(serialize('json', [new_service]))
            return Response(serialized_newService)