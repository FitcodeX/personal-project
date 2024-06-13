from django.shortcuts import render
from django.core.serializers import serialize
from rest_framework.views import APIView, Response

from .models import WorkOrder, WorkOrderDetail
import json
# Create your views here.
class AllWorkOrders(APIView):
    
    def get(self, request):
        workOrders = WorkOrder.objects.order_by('workOrder_id')
        serialized_workOrders = serialize('json', workOrders)
        json_workOrders = json.loads(serialized_workOrders)
        return Response(json_workOrders)
    

class AllWorkOrderDetails(APIView):
    
    def get(self, request):
        workOrderDetails = WorkOrderDetail.objects.order_by('id')
        serialized_workOrderDetails = serialize('json', workOrderDetails)
        json_workOrderDetails = json.loads(serialized_workOrderDetails)
        return Response(json_workOrderDetails)
    
class SelectedWorkOrder(APIView):
      
    def get(self, request, id):
        workOrder = WorkOrder.objects.get(workOrder_id= id)
        serialized_workOrder = serialize('json', [workOrder])
        json_workOrder = json.loads(serialized_workOrder)[0]
        return Response(json_workOrder)
    
    #verify that it works properly(might make new class for this function)
    def post(self, request):
        new_workOrder = WorkOrder.objects.create(**request.data)
        new_workOrder.full_clean()
        new_workOrder.save()
        json_workOrder = json.loads(serialize('json', [new_workOrder]))
        return Response(json_workOrder)
    
    def delete(self, request, id):
        workOrder = WorkOrder.objects.get(workOrder_id= id)
        workOrder_id = workOrder.workOrder_id
        workOrder.delete()
        return Response(f'{workOrder_id} has been deleted.')
    
    def put(self, request, id):
        workOrder = WorkOrder.objects.get(workOrder_id= id)
        if 'complete' in request.data:
            workOrder.completeStatus(request.data['complete'])
        if 'notes' in request.data:
            workOrder.updatedNotes(request.data['notes'])
        workOrder.full_clean()
        workOrder.save()
        json_workOrder = json.loads(serialize('json', [workOrder]))
        return Response(json_workOrder)
    
class SelectedWorkOrderDetails(APIView):

    def get(self, request, id):
        WorkDetail = WorkOrderDetail.objects.get(id= id)
        serialized_workDetail = serialize('json', [WorkDetail])
        json_vehicle = json.loads(serialized_workDetail)[0]
        return Response(json_vehicle)
    
    def delete(self, request, id):
        WorkDetail = WorkOrderDetail.objects.get(id= id)
        id = WorkDetail.id
        WorkDetail.delete()
        return Response(f'{id} has been deleted.')
    
    #verify that it works properly(might make new class for this function)
    def post(self, request):
        requested_workOrder_id = request.data.get('workOrder_id')
        workOrder = WorkOrder.object.get(workOrder_id= requested_workOrder_id)

        workOrder_data = request.data.copy()
        workOrder_data['workOrder_id'] = workOrder.id

        new_details = WorkOrderDetail.objects.create(**workOrder_data)
        new_details.full_clean()
        new_details.save()
        serialized_workDetail = json.loads(serialize('json', [new_details]))
        return Response(serialized_workDetail)
    
    def put(self, request, id):
        WorkDetail = WorkOrderDetail.objects.get(id= id)
        if 'mileage' in request.data:
            WorkDetail.change_mileage(request.data['mileage'])
        WorkDetail.full_clean()
        WorkDetail.save()
        serialized_workDetail = json.serialize('json', [WorkDetail])
        return Response(serialized_workDetail)