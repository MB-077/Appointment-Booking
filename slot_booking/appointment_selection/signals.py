from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Appointment, TimeSlot

@receiver(pre_save, sender=Appointment)
def save_old_time_slot(sender, instance, **kwargs):
    # Check if this is an existing appointment (i.e., update)
    if instance.pk:
        old_instance = Appointment.objects.get(pk=instance.pk)
        instance._old_time_slot = old_instance.time_slot
    else:
        instance._old_time_slot = None

@receiver(post_save, sender=Appointment)
def update_time_slot_booked_status_on_save(sender, instance, created, **kwargs):
    if created:
        instance.time_slot.is_booked = True
        instance.time_slot.save()
    else:
        # Use the old_time_slot saved in pre_save signal
        if instance._old_time_slot and instance._old_time_slot != instance.time_slot:
            instance._old_time_slot.is_booked = False
            instance._old_time_slot.save()
            instance.time_slot.is_booked = True
            instance.time_slot.save()

@receiver(post_delete, sender=Appointment)
def update_time_slot_booked_status_on_delete(sender, instance, **kwargs):
    instance.time_slot.is_booked = False
    instance.time_slot.save()