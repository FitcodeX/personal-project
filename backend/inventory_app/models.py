from django.db import models
from djmoney.models.fields import MoneyField

# Create your models here.
class Inventory(models.Model):
    part_id = models.AutoField(primary_key= True)
    name = models.CharField(blank= False, max_length= 255)
    quantity = models.IntegerField()
    price = MoneyField(max_digits= 10, decimal_places= 2, default_currency='USD')

    def __str__(self):
        return f"Parts Id {self.part_id} created."
    
    def change_quantity(self, quantity):
        self.quantity = quantity
        self.save()