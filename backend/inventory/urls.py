from django.urls import path
from . import views

urlpatterns = [
    path("user-inventory/", views.ItemsRetrieveUserList.as_view()),
    path("inventory/", views.ItemsRetrieveList.as_view()),
    path("create/", views.ItemCreate.as_view()),
    path("item/<int:pk>/", views.ItemRetrieveUpdateDestroy.as_view()),
]