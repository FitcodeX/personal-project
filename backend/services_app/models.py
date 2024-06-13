from django.db import models
from djmoney.models.fields import MoneyField

# Create your models here.
class Services(models.Model):
    service_id = models.AutoField(primary_key= True)
    name = models.CharField(max_length= 255)
    description = models.CharField(max_length= 500)
    price = MoneyField(max_digits= 10, decimal_places= 2, default_currency='USD')

    def __str__(self):
        return f"Service Id {self.service_id} created."
    
    def updated_price(self, updated_price):
        self.price = updated_price
        self.save()