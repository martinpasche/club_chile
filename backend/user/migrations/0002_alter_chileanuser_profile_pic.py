# Generated by Django 5.0.2 on 2024-04-07 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chileanuser',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pictures'),
        ),
    ]
