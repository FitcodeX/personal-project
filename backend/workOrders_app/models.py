from django.db import models
# from djmoney.models.fields import MoneyField

from customers_app.models import Customer, Vehicle
from services_app.models import Services
from inventory_app.models import Inventory

# Create your models here.
class WorkOrder(models.Model):
    workOrder_id = models.AutoField(primary_key= True)
    customer_id = models.OneToOneField('customers_app.Customer', on_delete=models.CASCADE, blank= False)
    # vehicle_id = models.OneToOneField(Vehicles, blank = False)
    service_description = models.CharField(blank= False, max_length=1000)
    notes = models.CharField(max_length= 1000)
    date = models.DateField(auto_created= True)
    complete = models.BooleanField(default= False)

    def __str__(self):
        return f"WorkOrder Id (self.workOrder_id) for Customer Id {self.customer_id}."
    

    def completeStatus(self, updatedStatus):
        self.complete = updatedStatus
        self.save()

    def updatedNotes(self, updatedNotes):
        self.notes = updatedNotes
        self.save()
        
    
class WorkOrderDetail(models.Model):
    id = models.AutoField(primary_key= True)
    workOrder_id = models.ForeignKey('WorkOrder', on_delete=models.CASCADE, blank= False)
    service_id = models.ForeignKey('services_app.Services', on_delete=models.PROTECT, blank= False)
    part_id = models.ForeignKey('inventory_app.Inventory', on_delete=models.PROTECT, blank= False, null= True)
    part_quality = models.IntegerField()

    def __str__(self):
        return f"Work order details Id {self.id} for WorkOrder Id {self.workOrder_id} created."