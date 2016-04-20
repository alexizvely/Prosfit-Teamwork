from django.test import TestCase
from rest_framework.test import APIClient, APIRequestFactory, force_authenticate
from authentication.models import Account
import authentication.views

# Create your tests here.


class HomeTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.requests = APIRequestFactory()
    
    def test_get_home_returns_200(self):
        response = self.client.get('/')
        
        self.assertEqual(response.status_code, 200)
