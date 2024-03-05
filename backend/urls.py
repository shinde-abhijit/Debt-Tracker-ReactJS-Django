from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from app import urls
from rest_framework.routers import DefaultRouter
from app.views import DebtTrackerViewSet

router = DefaultRouter()
router.register('debt-trackers', DebtTrackerViewSet, basename='debt-tracker')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    path("__reload__/", include("django_browser_reload.urls")),
    path('api/', include(router.urls)),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)