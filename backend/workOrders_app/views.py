from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WorkOrder, WorkOrderDetail
from .serializers import WorkOrderSerializer, WorkOrderDetailSerializer

class AllWorkOrders(APIView):
    def get(self, request):
        work_orders = WorkOrder.objects.order_by('workOrder_id')
        serializer = WorkOrderSerializer(work_orders, many=True)
        return Response(serializer.data)

class AllWorkOrderDetails(APIView):
    def get(self, request):
        work_order_details = WorkOrderDetail.objects.order_by('id')
        serializer = WorkOrderDetailSerializer(work_order_details, many=True)
        return Response(serializer.data)

class SelectedWorkOrder(APIView):
    def get(self, request, id):
        work_order = WorkOrder.objects.get(workOrder_id=id)
        serializer = WorkOrderSerializer(work_order)
        return Response(serializer.data)
   
    def delete(self, request, id):
        work_order = WorkOrder.objects.get(workOrder_id=id)
        work_order_id = work_order.workOrder_id
        work_order.delete()
        return Response(f'{work_order_id} has been deleted.')

    def put(self, request, id):
        work_order = WorkOrder.objects.get(workOrder_id=id)
        if 'complete' in request.data:
            work_order.completeStatus(request.data['complete'])
        if 'notes' in request.data:
            work_order.updatedNotes(request.data['notes'])
        work_order.full_clean()
        work_order.save()
        serializer = WorkOrderSerializer(work_order)
        return Response(serializer.data)

class SelectedWorkOrderDetails(APIView):
    def get(self, request, id):
        work_detail = WorkOrderDetail.objects.get(id=id)
        serializer = WorkOrderDetailSerializer(work_detail)
        return Response(serializer.data)
    
    def delete(self, request, id):
        work_detail = WorkOrderDetail.objects.get(id=id)
        work_detail.delete()
        return Response(f'{id} has been deleted.')

    def put(self, request, id):
        work_detail = WorkOrderDetail.objects.get(id=id)
        if 'mileage' in request.data:
            work_detail.change_mileage(request.data['mileage'])
        work_detail.full_clean()
        work_detail.save()
        serializer = WorkOrderDetailSerializer(work_detail)
        return Response(serializer.data)

class CreateWorkOrder(APIView):
    def post(self, request):
        serializer = WorkOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateWorkOrderDetails(APIView):
    def post(self, request):
        serializer = WorkOrderDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
