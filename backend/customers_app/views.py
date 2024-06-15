from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status

from .models import Customer, Vehicle
from .serializers import CustomerSerializer, VehicleSerializer

class AllCustomers(APIView):
    def get(self, request):
        customers = Customer.objects.order_by('customer_id')
        serialized_customers = CustomerSerializer(customers, many=True)
        return Response(serialized_customers.data)
    
class AllVehicles(APIView):
    def get(self, request):
        vehicles = Vehicle.objects.order_by('vehicle_id').select_related('customer_id')
        serialized_vehicles = VehicleSerializer(vehicles, many=True)
        return Response(serialized_vehicles.data)
    
class SelectedCustomer(APIView):
    def get(self, request, id):
        customer = Customer.objects.get(customer_id=id)
        serialized_customer = CustomerSerializer(customer)
        return Response(serialized_customer.data)
   
    def delete(self, request, id):
        customer = Customer.objects.get(customer_id=id)
        customer_id = customer.customer_id
        customer.delete()
        return Response(f'{customer_id} has been deleted.')
    
    def put(self, request, id):
        customer = Customer.objects.get(customer_id=id)
        if 'phone_number' in request.data:
            customer.change_phone_number(request.data['phone_number'])
        if 'email' in request.data:
            customer.change_email(request.data['email'])
        customer.full_clean()
        customer.save()
        serialized_customer = CustomerSerializer(customer)
        return Response(serialized_customer.data)
    
class CreateCustomer(APIView):
    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class SelectedVehicle(APIView):
    def get(self, request, id):
        vehicle = Vehicle.objects.get(vehicle_id=id)
        serialized_vehicle = VehicleSerializer(vehicle)
        return Response(serialized_vehicle.data)
    
    def delete(self, request, id):
        vehicle = Vehicle.objects.get(vehicle_id=id)
        vehicle_id = vehicle.vehicle_id
        vehicle.delete()
        return Response(f'{vehicle_id} has been deleted.')
    
    def put(self, request, id):
        vehicle = Vehicle.objects.get(vehicle_id=id)
        if 'mileage' in request.data:
            vehicle.change_mileage(request.data['mileage'])
        vehicle.full_clean()
        vehicle.save()
        serialized_vehicle = VehicleSerializer(vehicle)
        return Response(serialized_vehicle.data)
    
class CreateVehicle(APIView):
   
    def post(self, request):
        serializer = VehicleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

