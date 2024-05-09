from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

from rest_framework import viewsets, renderers, generics, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.authentication  import SessionAuthentication
from rest_framework.exceptions import APIException
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from datetime import datetime, timedelta
import os
import random

from .models import Item
from .serializers import ItemSerializer
        


class ItemsRetrieveList (ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    
    
class ItemsRetrieveUserList (ListCreateAPIView):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]
        
    def get_queryset(self):
        user = self.request.user
        queryset = Item.objects.filter(user = user)
        return queryset
    
    
class ItemCreate (CreateAPIView):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
    
    def post(self, request, *args, **kwargs):
        user = request.user
        
        mutable_data = request.data.copy()
        mutable_data["user"] = user.user_id
        
        if 'item_image' not in mutable_data or not mutable_data.get('item_image'):
            
            images_path = os.listdir(os.path.join(settings.BASE_DIR , "media", "default_images"))
            default_image_path = random.choice(images_path)
            default_image_whole_path = os.path.join(settings.BASE_DIR, "media", "default_images", default_image_path)
            default_image_content = default_storage.open(default_image_whole_path).read()
            default_image_name = 'default_name.jpg'
            mutable_data['item_image'] = ContentFile(default_image_content, default_image_name)
        
        _, ext = os.path.splitext(mutable_data.get('item_image').name)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        new_filename = f"item_img_user_{user.user_id}_{timestamp}{ext}"
        
        # if None
        if mutable_data.get('item_image'): 
            mutable_data["item_image"].name = new_filename
        else:
            raise APIException("No image file was provided.")
            
        request._full_data = mutable_data
        
        return super().post(request, *args, **kwargs)
        
        
class ItemRetrieveUpdateDestroy (RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    
    def get_object(self):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise APIException("You do not have permission to perform this action.")
        return obj
    
    def create(self, request, *args, **kwargs):
        user = request.user
        request.data["user"] = user.user_id
        return super().create(request, *args, **kwargs)
    
    
    def put(self, request, *args, **kwargs):        
        user = request.user
        request.data._mutable = True
        request.data["user"] = user.user_id        
        if not request.data.get('item_image'):
            request.data["item_image"] = Item.objects.get(item_id = kwargs["pk"]).item_image
        else:
            _, ext = os.path.splitext(request.data.get('item_image').name)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            new_filename = f"item_img_user_{user.user_id}_{timestamp}{ext}"
            request.data["item_image"].name = new_filename
        
        return super().put(request, *args, **kwargs)	

