from django.urls import path
from .views import AllServices, SelectedService, CreateService

urlpatterns = [
    path('all_services', AllServices.as_view(), name='all_services'),
    path('<int:id>/', SelectedService.as_view(), name='selected_service'),
    path('create_service', CreateService.as_view(), name='create_service')
]