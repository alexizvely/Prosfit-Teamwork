from django.test import SimpleTestCase
from rest_framework.test import APIClient

# Create your tests here.


class HomeTestCase(SimpleTestCase):
    def setUp(self):
        self.client = APIClient()
    
    def test_get_home_returns_200(self):
        response = self.client.get('/')
        
        self.assertEqual(response.status_code, 200)
    
    def test_register_with_correct_data_is_succesful(self):
        response = self.login()
