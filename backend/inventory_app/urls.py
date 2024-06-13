from django.urls import path
from .views import AllParts, SelectedPart

urlpatterns = [
    path('all_parts', AllParts.as_view(), name='all_parts'),
    path('<int:id>/', SelectedPart.as_view(), name='selected_part'),
]