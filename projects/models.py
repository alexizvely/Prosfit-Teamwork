from django.db import models
from authentication.models import Account
from pando3d.constants import STATUS_OPTIONS, SHAPES

# Create your models here.

class Project(models.Model):
    author = models.ForeignKey(Account)
    name = models.CharField(max_length=50)

    shape_type = models.CharField(choices=SHAPES, max_length=2)
    dimension_x = models.PositiveIntegerField()
    dimension_y = models.PositiveIntegerField()
    dimension_z = models.PositiveIntegerField()
    color = models.CharField(max_length=6, ) # NB! Maybe increase maxlength to 7, if the hex symbol is more convenient for the client
    status = models.CharField(max_length=50, 
                            choices=STATUS_OPTIONS, 
                            default='saved')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
