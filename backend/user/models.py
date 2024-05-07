from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager

import os

class ChileanUserManager (BaseUserManager):
    
    def create_user(self, email, username, password = None):
        
        if not email:
            raise ValueError("User must have an email address")
        if not username:
            raise ValueError("User must specify an username")

        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    
    def create_superuser (self, email, username, password = None):
        
        user = self.create_user(
            email,
            password=password,
            username=username,
        )

        user.is_superuser = True
        user.save(using=self._db)
        return user



class ChileanUser (AbstractBaseUser, PermissionsMixin):
    
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length = 40, blank=True, default='', unique=True)
    email = models.EmailField(max_length = 50, unique = True)
    live_on_campus = models.BooleanField(default = False)
    studying = models.BooleanField(default = False)
    profile_pic = models.ImageField(upload_to="profile_pictures", blank = True, null = True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    
    #specify user manage
    objects = ChileanUserManager()
    
    def __str__(self):
        return self.email
    
    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_superuser
    
    def save(self, *args, **kwargs):
        if self.profile_pic and hasattr(self.profile_pic, 'name'):
            # set to None to prevent the image from being deleted
            _, ext = os.path.splitext(self.profile_pic.name)
            new_filename = f'user_img_{self.user_id}{ext}'
            self.profile_pic.name = new_filename
        super().save(*args, **kwargs)
    
