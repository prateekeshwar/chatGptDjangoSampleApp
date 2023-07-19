from django.urls import path

from . import views

urlpatterns = [
    path("gpt_data", views.OpenApiData.as_view()),
]
