from django.contrib import admin

# Register your models here.

from .models import *

class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('start_time', 'end_time', 'is_booked', 'booked_by')
    list_filter = ('is_booked',)
    # prepopulated_fields = {'is_booked':('booked_by',)}

admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(TimeSlot, TimeSlotAdmin)
admin.site.register(Appointment)
