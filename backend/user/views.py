from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, csrf_protect, ensure_csrf_cookie
from django.core.files.storage import default_storage
from django.core.mail import send_mail

from rest_framework import viewsets, renderers, generics, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication  import SessionAuthentication
from rest_framework.exceptions import APIException
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from datetime import datetime, timedelta

from .serializers import ChileanUserRegisterSerializer, ChileanUserLoginSerializer, ChileanUserSerializer
from .validations import *


# Create your views here.



class UserRegister (APIView):
    
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    
    def post (self, request, format = None):
        
        try:
            valid_data = validation_registration(request.data)
            serializer = ChileanUserRegisterSerializer(data = valid_data)
            
            if serializer.is_valid():
                user = serializer.save()
                if user:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status= status.HTTP_400_BAD_REQUEST)
        
        except ValidationError as error:
            raise APIException(detail = str(error), code=status.HTTP_400_BAD_REQUEST)
            


@method_decorator(ensure_csrf_cookie, name='dispatch')
class UserLogin (APIView):
    
    authentication_classes = []
    permission_classes = [permissions.AllowAny, ]
    
    def post (self, request, format = None):
        try:
            validated_data = validation_login(request.data)    
            serializer = ChileanUserLoginSerializer(data = validated_data)
            
            if serializer.is_valid():
                user = serializer.check_user(validated_data)
                login(request, user)
                
                """ try:
                    send_mail(
                        subject="Just checking", 
                        message="You have logged in", 
                        from_email="server@django.clubchilien.xyz", 
                        recipient_list=[user.email], 
                        fail_silently=False)
                except Exception as error:
                    raise APIException(detail = str(error), code=status.HTTP_400_BAD_REQUEST) """                
                
                return Response(serializer.data, status= status.HTTP_200_OK)
            
            return Response(status = status.HTTP_400_BAD_REQUEST)
        except ValidationError as error:
            try:
                error = list(error)[0]
            except Exception as error:
                pass
            
            if str(error) == "User not found":
                raise APIException(detail = "'[Email or Password Incorrect]'", code=status.HTTP_404_NOT_FOUND)
            else:
                raise APIException(detail = str(error), code=status.HTTP_400_BAD_REQUEST)
    
    

class UserLogout (APIView):
    
    authentication_classes = [ SessionAuthentication, ]
    permission_classes = [permissions.IsAuthenticated, ]
    
    def post (self, request, format = None):
        logout(request)
        response = Response(status=status.HTTP_200_OK)
        return response
            
            
            
class UserView (APIView):
    authentication_classes = [authentication.SessionAuthentication, ]
    permission_classes = [permissions.IsAuthenticated, ]
    
    def get (self, request, format = None):     
        serializer = ChileanUserSerializer(request.user)
        return Response ( {'user' : serializer.data }, status = status.HTTP_200_OK )
    
    
    
class UserUpdate (APIView):
    authentication_classes = [authentication.SessionAuthentication, ]
    permission_classes = [permissions.IsAuthenticated, ]
    parser_classes = [MultiPartParser, FormParser, JSONParser,]
    
    def post (self, request, format = None):    
        
        try: 
            user = request.user
            data = validation_update(request.data, user)
            data_validated = password_validation( data )
            serializer = ChileanUserSerializer(
                                                request.user, 
                                                data = data_validated, 
                                                partial = True,
                                                )
            if serializer.is_valid(raise_exception=False):
                
                # delete the old picture
                if user.profile_pic:
                    previous_image_path = user.profile_pic.path
                    if default_storage.exists(previous_image_path):
                        default_storage.delete(previous_image_path)
                
                serializer.save()
                return Response(serializer.data, status = status.HTTP_200_OK)
            else:
                # return Response(status = status.HTTP_400_BAD_REQUEST)
                raise APIException(detail = str(serializer.errors), code=status.HTTP_400_BAD_REQUEST)
        except ValidationError as error:
            raise APIException(detail = str(error), code=status.HTTP_400_BAD_REQUEST)


    
    
class TestView (APIView):
    authentication_classes = [authentication.SessionAuthentication, ]
    permission_classes = [permissions.IsAuthenticated]
    
    def post (self, request, format = None):     
        print("Post ha pasado la prueba con el usuario")
        print(request.user)
        
        return Response ( status = status.HTTP_200_OK )
        