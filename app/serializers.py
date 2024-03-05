from rest_framework import serializers
from .models import DebtTracker

class DebtTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebtTracker
        fields = '__all__'