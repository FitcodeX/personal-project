from rest_framework import serializers
from .models import Customer, Vehicle

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customer_id', 'first_name', 'last_name', 'phone_number', 'email']

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['vehicle_id', 'customer_id', 'make', 'model', 'year', 'VIN', 'license_plate', 'mileage']
