from django.db import models
from django.utils import timezone
import math
from django.core.exceptions import ValidationError
from datetime import timedelta

class DebtTracker(models.Model):
    debt_taken = models.DateField(default=timezone.now().today)
    debt_name = models.CharField(max_length=100)
    debt_mobile = models.PositiveIntegerField()
    debt_address = models.CharField(max_length=1000)
    debt_amount = models.DecimalField(max_digits=10, decimal_places=2)
    debt_interest = models.DecimalField(max_digits=10, decimal_places=2)
    debt_start_date = models.DateField(default=timezone.now().today)
    debt_end_date = models.DateField(default=timezone.now().today() + timedelta(days=1))
    emi_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    total_amount_paid = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_emi(self):
        # Assuming the interest is provided as a percentage
        interest_rate = float(self.debt_interest) / 100.0

        # Convert Decimal values to float before performing calculations
        debt_amount_float = float(self.debt_amount)

        # Calculate EMI amount using simple interest formula
        self.emi_amount = (debt_amount_float * interest_rate) / 10

        # Calculate the total amount paid over the loan duration
        loan_duration_days = (self.debt_end_date - self.debt_start_date).days
        self.total_amount_paid = debt_amount_float + self.emi_amount * (loan_duration_days / 30)

    def clean(self):
        super().clean()
        # Ensure debt_mobile has exactly 10 digits
        mobile_str = str(self.debt_mobile)
        if len(mobile_str) != 10:
            raise ValidationError({'debt_mobile': 'Mobile number must have exactly 10 digits.'})

    def save(self, *args, **kwargs):
        # Calculate EMI and total amount paid before saving
        self.calculate_emi()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.debt_name} - Debt Amount: {self.debt_amount} - EMI: {self.emi_amount} - Total Paid: {self.total_amount_paid}"