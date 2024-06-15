from rest_framework import serializers
from .models import WorkOrder, WorkOrderDetail
from customers_app.models import Customer
from services_app.models import Services
from inventory_app.models import Inventory

class WorkOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        fields = ['workOrder_id', 'customer_id', 'vehicle_mileage', 'service_description', 'notes', 'date', 'complete']

class WorkOrderDetailSerializer(serializers.ModelSerializer):
    workOrder = WorkOrderSerializer(source='workOrder_id', read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(queryset=Services.objects.all())
    part_id = serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all(), allow_null=True)

    class Meta:
        model = WorkOrderDetail
        fields = ['id', 'workOrder', 'service_id', 'part_id', 'part_quality']
