from rest_framework import serializers

from authentication.serializers import AccountSerializer
from models import Project

class ProjectSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)
    svgFile = serializers.FileField(write_only=True, required=False)
    svgText = serializers.CharField(required=False)

    print dir(svgText);
    class Meta:
        model = Project

        fields = ('id', 'name', 'shape_type', 'dimension_x', 'dimension_y', 'dimension_z', 'color', 'status', 'author', 'created_at', 'updated_at', 'svgFile', 'svgText')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()

        return exclusions + ['author']

