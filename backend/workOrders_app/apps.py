from django.apps import AppConfig


class WorkordersAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'workOrders_app'


    def ready(self):
        import workOrders_app.signals