from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()

def validation_registration (data):
    try:
        email = data['email'].strip()
        username = data['username'].strip()
        password1 = data['password1'].strip()
        password2 = data['password2'].strip()
        
    except KeyError as error:
        raise ValidationError("Missing an attribute for Registration")
    
    if not email or UserModel.objects.filter(email = email).exists():
        raise ValidationError("Email taken, choose another email")
    
    if not username or UserModel.objects.filter(username = username).exists():
        raise ValidationError("Username taken, choose another username")
    
    if not password1 or not password2:
        raise ValidationError("There is no password")
    
    if not password1 or len(password1) < 8:
        raise ValidationError("Choose another password, min 8 characters")
    
    if password1 != password2:
        raise ValidationError("Passwords do not match")
    
    data["password"] = password1
    
    return data



def validation_login (data):
    
    try: 
        email = data['email'].strip()
        password = data['password'].strip()
        
    except KeyError as error:
        raise ValidationError("Missing an attribute for Login")
    
    if not email:
        raise ValidationError("Missing email")
    
    if not password:
        raise ValidationError("Missing Password")
    
    return data



def validation_update (data, user):
    
    try:
        email = data['email'].strip()
        username = data['username'].strip()
        live_on_campus = data['live_on_campus']
        studying = data['studying']
        profile_pic = data['profile_pic']
        
    except KeyError as error:
        raise ValidationError("Missing an attribute for Update")
    
    if not email:
        raise ValidationError("Missing email")
    
    if email != user.email and UserModel.objects.filter(email = email).exists():
        raise ValidationError(f"Email taken, choose another email user:{user.email} email: {email}")
    
    if not username:
        raise ValidationError("Missing username")
    
    if username != user.username and UserModel.objects.filter(username = username).exists():
        raise ValidationError("Username taken, choose another username")
    
    if live_on_campus == None:
        raise ValidationError("Missing live_on_campus")
    
    if studying == None:
        raise ValidationError("Missing studying")
    
    """ if profile_pic == None:
        raise ValidationError("Missing profile_pic") """
    
    return data


def password_validation (data):
    
    try:
        password1 = data["password1"]
        password2 = data["password2"]

    except KeyError as error:
        raise ValidationError("Missing password")
    
    password1 = password1.strip()
    password2 = password2.strip()
    
    if password1 == "" and password2 == "":
        # if data doesnt have the attribute "new_password" then it will wont update it
        return data
    
    if password1 != password2:
        raise ValidationError("Passwords do not match")
    
    if len(password1) < 8:
        raise ValidationError("Choose another password, min 8 characters")
    
    data["new_password"] = password1
    return data

