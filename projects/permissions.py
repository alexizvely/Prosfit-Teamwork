from rest_framework import permissions


class IsAuthorOfProject(permissions.BasePermission):
    def has_object_permission(self, request, view, post):
        print("PESHO")
        if request.user:
            return post.author == request.user
        return False

class IsAdminUser(permissions.BasePermission):
    def has_permision(self, request, view):
        print("IN IS ADMIN")
        print(request.user)
        return request.user and request.user.is_staff