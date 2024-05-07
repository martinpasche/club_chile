from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.UserRegister.as_view(), ),
    path("login/", views.UserLogin.as_view()),
    path("logout/", views.UserLogout.as_view()),
    path("user/",  views.UserView.as_view()),
    path("update/", views.UserUpdate.as_view()),
    path("test/", views.TestView.as_view()),
    
]