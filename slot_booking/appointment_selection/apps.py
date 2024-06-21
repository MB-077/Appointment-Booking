from django.apps import AppConfig


class AppointmentSelectionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'appointment_selection'
    
    def ready(self):
        import appointment_selection.signals
