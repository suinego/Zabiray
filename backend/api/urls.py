from django.urls import path
from . import views

urlpatterns = [
    path('users/',                          views.users_list,    name='users-list'),
    path('users/<int:user_id>/',            views.user_detail,   name='user-detail'),
    path('chats/',                          views.chats_list,    name='chats-list'),
    path('chats/<int:chat_id>/',            views.chat_detail,   name='chat-detail'),
    path('chats/<int:chat_id>/messages/',   views.chat_messages, name='chat-messages'),
    path('chats/<int:chat_id>/send/',       views.send_message,  name='send-message'),
    path('stats/',                          views.stats,         name='stats'),
    path('chats/<int:chat_id>/summary/',    views.group_summary, name='group-summary'),
]
