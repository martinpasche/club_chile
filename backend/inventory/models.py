from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.files.storage import default_storage

import os

# Create your models here.
class Item (models.Model):
    
    item_id = models.AutoField(primary_key = True)
    item_name = models.CharField(max_length = 100)
    item_description = models.CharField(max_length = 400)
    item_quantity = models.IntegerField()
    item_image = models.ImageField(upload_to="item_images", blank = True, null = True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.item_name
    
    class Meta:
        db_table = "Items"
        
    def save(self, *args, **kwargs):
        
        if self.pk:
            try:
                # Get the previous instance of the item
                prev_instance = Item.objects.get(pk=self.pk)
                # Check if the item image has changed
                if prev_instance.item_image != self.item_image:
                    # Delete the previous image file
                    if prev_instance.item_image:
                        previous_image_path = prev_instance.item_image.path
                        if default_storage.exists(previous_image_path):
                            default_storage.delete(previous_image_path)
            except Item.DoesNotExist:
                pass  # If the item doesn't exist yet, there's no previous image to delete
                
        super().save(*args, **kwargs)
        
        
    def delete(self, *args, **kwargs):
        # Delete the associated image file
        if self.item_image:
            image_path = self.item_image.path
            if default_storage.exists(image_path):
                default_storage.delete(image_path)
        super().delete(*args, **kwargs)