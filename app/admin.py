from django.contrib import admin
from .models import DebtTracker

class DebtTrackerAdmin(admin.ModelAdmin):
    list_display = ('debt_name', 'debt_mobile', 'debt_amount', 'debt_interest', 'emi_amount', 'total_amount_paid', 'debt_start_date', 'debt_end_date', 'created_at', 'updated_at')
    search_fields = ('debt_name', 'debt_mobile')
    list_filter = ('created_at', 'updated_at')

admin.site.register(DebtTracker, DebtTrackerAdmin)