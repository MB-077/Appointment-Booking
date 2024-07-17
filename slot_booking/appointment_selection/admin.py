from django.contrib import admin

# Register your models here.

from .models import *


class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'patient', 'date', 'time_slot', 'reschedule_requested', 'is_approved', )
    list_filter = ('doctor', 'date', 'reschedule_requested', 'is_approved', )
    search_fields = ('doctor__user__username', 'patient__user__username', 'date', )
    
admin.site.register(Appointment, AppointmentAdmin)


class DoctorNonAvailability(admin.TabularInline):
    model = DoctorNonAvailability
    extra = 0

class TimeSlot(admin.TabularInline):
    model = TimeSlot
    extra = 0
    
class DoctorAdmin(admin.ModelAdmin):
    inlines = [TimeSlot, DoctorNonAvailability]
    list_display = ('user', 'specialty', )
    search_fields = ('user__username', 'specialty', )
    list_filter = ('specialty', )
    
admin.site.register(Doctor, DoctorAdmin)


class PatientDetails(admin.StackedInline):
    model = PatientDetails
    extra = 0

class PatientAdmin(admin.ModelAdmin):
    inlines = [PatientDetails]
    list_display = ('user', 'phone_number')
    

admin.site.register(Patient, PatientAdmin)

