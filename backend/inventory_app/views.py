from django.shortcuts import render
from rest_framework.views import APIView, Response
from django.core.serializers import serialize

from .models import Inventory
import json
# Create your views here.
class AllParts(APIView):

    def get(self, request):
        parts = Inventory.objects.order_by('part_id')
        serialized_parts = serialize('json', parts)
        json_parts =json.loads(serialized_parts)
        return Response(json_parts)
    
class SelectedPart(APIView):

    def get(self, request, id):
        part = Inventory.objects.get(part_id= id)
        serialized_part = serialize('json', [part])
        json_part = json.loads(serialized_part)[0]
        return Response(json_part)
    
    def post(self, request):
        new_part = Inventory.objects.create(**request.data)
        new_part.full_clean()
        new_part.save()
        serialized_newPart = json.loads(serialize('json', [new_part]))
        return Response(serialized_newPart)
    
    def delete(self, request, id):
        part = Inventory.objects.get(part_id= id)
        part_id = part.part_id
        part.delete()
        return Response(f'{part_id} has been deleted.')
    
    def put(self, request, id):
        part = Inventory.objects.get(part_id= id)
        if 'quantity' in request.data:
            part.change_quantity(request.data['quantity'])
        part.full_clean()
        part.save()
        serialized_part = json.loads(serialize('json', [part]))
        return Response(serialized_part)