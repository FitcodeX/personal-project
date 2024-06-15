from django.urls import path
from .views import AllWorkOrders, AllWorkOrderDetails, SelectedWorkOrder, SelectedWorkOrderDetails, CreateWorkOrder, CreateWorkOrderDetails

urlpatterns = [
    path('all_workorders', AllWorkOrders.as_view(), name='all_workorders'),
    path('all_workorder_details', AllWorkOrderDetails.as_view(), name='all_workorder_details'),
    path('<int:id>', SelectedWorkOrder.as_view(), name='selected_workorder'),
    path('<int:id>/', SelectedWorkOrderDetails.as_view(), name='selected_workorder_details'),
    path('create_workOrder/', CreateWorkOrder.as_view(), name='create_workOrder'),
    path('create_workOrderDetails', CreateWorkOrderDetails.as_view(), name='create_workOrderDetails')
]