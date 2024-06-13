from django.db import models

# Create your models here.
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(blank= False, max_length= 255)
    last_name = models.CharField(blank= False, max_length= 255)
    phone_number = models.CharField(blank= False, max_length= 10)
    email = models.EmailField(blank= False, max_length= 255)

    def __str__(self):
        return f"Id {self.customer_id} - {self.first_name} {self.last_name}."
    
    def change_phone_number(self, number):
        self.phone_number = number
        self.save()

    def change_email(self, email):
        self.email = email
        self.save()


class Vehicle(models.Model):
    vehicle_id = models.AutoField(primary_key= True)
    customer_id = models.ForeignKey(Customer, on_delete= models.CASCADE, blank= False)
    make = models.CharField(blank= False, max_length= 255)
    model = models.CharField(blank= False, max_length= 255)
    year = models.IntegerField(blank= False)
    VIN = models.CharField(blank= False, max_length= 17)
    license_plate = models.CharField(max_length= 7)
    mileage = models.IntegerField()

    def __str__(self):
        return f"Vehicle ID {self.vehicle_id} for Customer ID {self.customer_id}."

    def change_mileage(self, mileage):
        self.mileage = mileage
        self.save()