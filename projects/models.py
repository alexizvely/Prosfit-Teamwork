from django.db import models
from authentication.models import Account
from pando3d.constants import STATUS_OPTIONS, SHAPES
from pando3d.settings import AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

# Create your models here.
def upload_file_to(instance, filename):
    import os
    from django.utils.timezone import now
    filename_base, filename_ext = os.path.splitext(filename)
    return 'models/%s%s' % (
        now().strftime("%Y%m%d%H%M%S"),
        filename_ext.lower(),
    )

def push_picture_to_s3(filename):
    try:
        import os
        import boto
        from boto.s3.key import key

        logging.getLogger('boto').setLevel(login.CRITICAL)
        bucket_name = AWS_STORAGE_BUCKET_NAME
        conn = boto.connect_s3(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
        bucket = conn.get_bucket(bucket_name)
        filename_base, filename_ext = os.path.splitext(filename)
        key = '%s.%s' % filename_base, filename_ext.lower()
        fn = 'models/%' % key
        k = Key(bucket)
        k.key = key
        k.set_contents_from_filename(fn)
        k.make_public()
        os.remove(fn)
        return "http://s#.amazonaws.com/%/%" % bucket_name, key
    except:
        return "error"


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
    svgText = models.CharField(max_length=10000000, default="")
    svgFile = models.FileField(upload_to=push_picture_to_s3, blank=True, default='text.svg')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
