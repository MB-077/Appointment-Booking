from django.contrib import admin

# Register your models here.

from .models import *


class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('start_time', 'end_time', 'is_booked', )
    list_filter = ('is_booked', )

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'patient', 'date', 'time_slot', 'reschedule_requested', 'is_approved', )
    list_filter = ('doctor', 'date', 'reschedule_requested', 'is_approved', )
    
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialty', )
    list_filter = ('specialty', )

class DoctorNonAvailabilityAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'start_date', 'start_time', 'end_date', 'end_time')
    list_filter = ('doctor', 'start_date', 'end_date',)
    
class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number')
    
class PatientDetailsAdmin(admin.ModelAdmin):
    list_display = ('patient', 'age', 'gender', 'email')
    list_filter = ('age',)
    
admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(TimeSlot, TimeSlotAdmin)
admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(PatientDetails, PatientDetailsAdmin)
admin.site.register(DoctorNonAvailability, DoctorNonAvailabilityAdmin)
# admin.site.register(DoctorNonAvailability)

