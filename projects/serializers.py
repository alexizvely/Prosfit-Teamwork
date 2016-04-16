from rest_framework import serializers

from authentication.serializers import AccountSerializer
from models import Project

class ProjectSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Project

        fields = ('id', 'name', 'shape_type', 'dimension_x', 'dimension_y', 'dimension_z', 'color', 'status', 'author')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()

        return exclusions + ['author']

