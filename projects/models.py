from django.db import models
from authentication.models import Account
from pando3d.constants import STATUS_OPTIONS, SHAPES

# Create your models here.
def upload_file_to(instance, filename):
    import os
    from django.utils.timezone import now
    filename_base, filename_ext = os.path.splitext(filename)
    return 'models/%s%s' % (
        now().strftime("%Y%m%d%H%M%S"),
        filename_ext.lower(),
    )


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
    svgFile = models.FileField(max_length=None, upload_to=upload_file_to, blank=True, default='text.svg')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
