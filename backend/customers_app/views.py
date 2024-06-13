from django.shortcuts import render
from django.core.serializers import serialize
from rest_framework.views import APIView, Response
from rest_framework import status

from  .models import Customer, Vehicle
from .serializers import CustomerSerializer, VehicleSerializer
import json
# Create your views here.
class AllCustomers(APIView):
    
    def get(self, request):
        customers = Customer.objects.order_by('customer_id')
        serialized_customers = serialize('json', customers)
        json_customers = json.loads(serialized_customers)
        return Response(json_customers)
    

class AllVehicles(APIView):
    
    def get(self, request):
        vehicles = Vehicle.objects.order_by('vehicle_id')
        serialized_vehicles = serialize('json', vehicles)
        json_vehicles = json.loads(serialized_vehicles)
        return Response(json_vehicles)
    
class SelectedCustomer(APIView):
      
    def get(self, request, id):
        customer = Customer.objects.get(customer_id= id)
        serialized_customer = serialize('json', [customer])
        json_customer = json.loads(serialized_customer)[0]
        return Response(json_customer)
   
    def delete(self, request, id):
        customer = Customer.objects.get(customer_id= id)
        customer_id = customer.customer_id
        customer.delete()
        return Response(f'{customer_id} has been deleted.')
    
    def put(self, request, id):
        customer = Customer.objects.get(customer_id= id)
        if 'phone_number' in request.data:
            customer.change_phone_number(request.data['phone_number'])
        if 'email' in request.data:
            customer.change_email(request.data['email'])
        customer.full_clean()
        customer.save()
        json_customer = json.loads(serialize('json', [customer]))
        return Response(json_customer)
    
class CreateCustomer(APIView):

     def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class SelectedVehicle(APIView):

    def get(self, request, id):
        vehicle = Vehicle.objects.get(vehicle_id= id)
        serialized_vehicle = serialize('json', [vehicle])
        json_vehicle = json.loads(serialized_vehicle)[0]
        return Response(json_vehicle)
    
    def delete(self, request, id):
        vehicle = Vehicle.objects.get(vehicle_id= id)
        vehicle_id = vehicle.vehicle_id
        vehicle.delete()
        return Response(f'{vehicle_id} has been deleted.')
    
    def put(self, request, id):
        vehicle = Vehicle.objects.get(vehicle_id= id)
        if 'mileage' in request.data:
            vehicle.change_mileage(request.data['mileage'])
        vehicle.full_clean()
        vehicle.save()
        serialized_vehicle = json.serialize('json', [vehicle])
        return Response(serialized_vehicle)
    
class CreateVehicle(APIView):

       def post(self, request):
        requested_customer_id = request.data.get('customer_id')
        customer = Customer.objects.get(customer_id= requested_customer_id)

        vehicle_data = request.data.copy()
        vehicle_data['customer_id'] = customer.id

        new_vehicle = Vehicle.objects.create(**vehicle_data)
        new_vehicle.full_clean()
        new_vehicle.save()
        serialized_vehicle = json.loads(serialize('json', [new_vehicle]))
        return Response(serialized_vehicle)
    