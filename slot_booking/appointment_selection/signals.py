from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Appointment, TimeSlot
from django.db import transaction

@receiver(pre_save, sender=Appointment)
def save_old_time_slot(sender, instance, **kwargs):
    if instance.pk:
        old_instance = Appointment.objects.select_related('time_slot').get(pk=instance.pk)
        instance._old_time_slot = old_instance.time_slot
    else:
        instance._old_time_slot = None

@receiver(post_save, sender=Appointment)
@transaction.atomic
def update_time_slot_booked_status_on_save(sender, instance, created, **kwargs):
    if created:
        instance.time_slot.is_booked = True
        instance.time_slot.save(update_fields=['is_booked'])
    else:
        if instance._old_time_slot and instance._old_time_slot != instance.time_slot:
            instance._old_time_slot.is_booked = False
            instance._old_time_slot.save(update_fields=['is_booked'])
            instance.time_slot.is_booked = True
            instance.time_slot.save(update_fields=['is_booked'])

@receiver(post_delete, sender=Appointment)
@transaction.atomic
def update_time_slot_booked_status_on_delete(sender, instance, **kwargs):
    instance.time_slot.is_booked = False
    instance.time_slot.save(update_fields=['is_booked'])