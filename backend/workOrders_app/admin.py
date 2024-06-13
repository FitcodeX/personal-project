from django.contrib import admin
from .models import WorkOrderDetail, WorkOrder

# Register your models here.
admin.site.register([WorkOrder, WorkOrderDetail])