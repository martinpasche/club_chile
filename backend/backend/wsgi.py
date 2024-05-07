"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from settings import STATIC_ROOT
from whitenoise import WhiteNoise



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

application = get_wsgi_application()

application = WhiteNoise(application, root=STATIC_ROOT)
application.add_files(MEDIA_ROOT, prefix='media/')