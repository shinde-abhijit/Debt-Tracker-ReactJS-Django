from django.shortcuts import render
from rest_framework import viewsets
from .models import DebtTracker
from .serializers import DebtTrackerSerializer

class DebtTrackerViewSet(viewsets.ModelViewSet):
    queryset = DebtTracker.objects.all()
    serializer_class = DebtTrackerSerializer