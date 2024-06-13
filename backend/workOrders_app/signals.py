from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import WorkOrderDetail
from inventory_app.models import Inventory

def update_invetory(sender, instance, **kwargs):
    part = instance.part_id
    if part:
        part.quantity -= instance.part_quality
        part.save()