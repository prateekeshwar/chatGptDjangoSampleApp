from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .utils import ask_open_ai, get_search_terms
import ast


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

class OpenApiData(APIView):


    def post(self, request):
        '''
		Post API to fetch answer from Chatgpt apis

			Data Post: 
			{
				question : String,
			}

			Response: {
                message: String,
				status: 200,
                data: dictionary
			}

		'''
        try:
            question = request.data.get('question')
            getChatAnswer = ask_open_ai(question)
            search_terms = get_search_terms(question)
            return Response({
                'message': 'data fetched successfully',
                'data': {"question": question, "answer": getChatAnswer, "search_term": search_terms},
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'message': 'data fetched successfully',
                'data': {"error": e},
                }, status=status.HTTP_200_OK)


