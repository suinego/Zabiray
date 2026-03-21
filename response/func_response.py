from gigachat import GigaChat
from gigachat.models import Chat, Messages, MessagesRole

with open("authorization_key.txt") as file:
  authorization_key = file.readline()

credentials = authorization_key


def response(text) : 

  with GigaChat(credentials=credentials, verify_ssl_certs=False) as giga:

    user_input = text 

    message = Messages(role=MessagesRole.USER, content=user_input)

    res = giga.chat(Chat(messages=[message]))
    bot_message = res.choices[0].message
    return bot_message.content