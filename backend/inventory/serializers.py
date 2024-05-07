from rest_framework import serializers
from .models import Item
from django.contrib.auth import get_user_model


User = get_user_model()

class UserItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class ItemSerializer(serializers.ModelSerializer):
    user = UserItemSerializer(read_only=True)
    
    class Meta:
        model = Item
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        print("representation", representation)
        if representation['user'] is None:
            representation['user'] = 'Unkown'
        return representation