from django.urls import path
from .views import AllCustomers, AllVehicles, SelectedCustomer, SelectedVehicle, CreateCustomer, CreateVehicle

urlpatterns = [
    path('all_customers', AllCustomers.as_view(), name='all_customers'),
    path('all_vehicles', AllVehicles.as_view(), name='all_vehicles'),
    path('<int:id>/', SelectedCustomer.as_view(), name='selected_customer'),
    path('create/', CreateCustomer.as_view(), name='create_customer'),
    path('vehicles/<int:id>/', SelectedVehicle.as_view(), name='selected_vehicle'),
    path('vehicles/create/', CreateVehicle.as_view(), name='create_vehicle')
]

