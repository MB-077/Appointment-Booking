from django.contrib import admin

# Register your models here.

from .models import *

class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('start_time', 'end_time', 'is_booked')
    list_filter = ('is_booked',)

admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(TimeSlot, TimeSlotAdmin)
admin.site.register(Appointment)
