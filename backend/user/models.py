

from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
import datetime

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, name='송형근', phone='0105050505050', password=None):
        user = self.model(
            
            email=self.normalize_email(email),
            #name="test",
            phone=phone,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, name, phone, password):
        user = self.create_user(
            email,
            password=password,
            name=name,
            phone=phone,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, phone, password):
        user = self.create_user(
            email,
            password=password,
            phone=phone,
            name="True",
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
   
    email = models.EmailField(('email address'), unique=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone']
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    def __str__(self):              # __unicode__ on Python 2
        return self.email
    objects = UserManager()

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.active

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True