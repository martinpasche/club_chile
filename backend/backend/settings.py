"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-op6-4^zi*=+qb7efadh))+-ani1h^&dg0d3hu41gnkp##1=y)$"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False


AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

# Application definition

INSTALLED_APPS = [
    "user",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'rest_framework.authtoken',
    "corsheaders",
    "rest_framework",
    "inventory",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}




# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


if DEBUG:

    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://*.localhost:3000",
        "http://*.127.0.0.1:3000",
        "http://*.localhost:8000",
        "http://*.127.0.0.1:8000",
    ]

    CORS_ORIGIN_WHITELIST = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://*.localhost:3000",
        "http://*.127.0.0.1:3000",
        "http://*.localhost:8000",
        "http://*.127.0.0.1:8000",
    ]


    CSRF_TRUSTED_ORIGINS = [
        'http://*.localhost:3000',
        'http://*.127.0.0.1:3000',
        'http://*.localhost:8000',
        'http://*.127.0.0.1:8000',
    ]

else:
    ALLOWED_HOSTS = ["https://django.clubchilien.xyz",
                     "django.clubchilien.xyz"]
    
    CORS_ALLOWED_ORIGINS = [
        "https://django.clubchilien.xyz",
        "https://clubchilien.xyz",
        "https://*.clubchilien.xyz"
    ]

    CORS_ORIGIN_WHITELIST = [
        "https://django.clubchilien.xyz",
        "https://clubchilien.xyz",
        "https://*.clubchilien.xyz"
    ]


    CSRF_TRUSTED_ORIGINS = [
        "https://django.clubchilien.xyz",
        "https://clubchilien.xyz"
        "https://*.clubchilien.xyz"
    ]
    
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    STATIC_ROOT = '/home/clubxkhj/public_html/static-django'
    MEDIA_ROOT = "/home/clubxkhj/public_html/media-django"
    
        
    


if DEBUG:
    CORS_ORIGIN_ALLOW_ALL = True
else:
    CORS_ORIGIN_ALLOW_ALL = False
    
CORS_ALLOW_CREDENTIALS = True


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
}

AUTH_USER_MODEL = "user.ChileanUser"
CSRF_COOKIE_NAME = "csrftoken"
ROOT_URLCONF = "backend.urls"
MEDIA_URL = '/media/'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "/static/"

