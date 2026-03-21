import time
import pandas as pd
from pathlib import Path
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .gigachat_service import get_ai_response

DATA_DIR = settings.DATA_DIR

USER_NAMES  = {1: 'Рома', 2: 'Иван', 3: 'Влад'}
USER_EMOJIS = {1: '🧑', 2: '👨', 3: '👦'}

# ── CSV helpers ───────────────────────────────────────────────

def load_users():
    df = pd.read_csv(DATA_DIR / 'users.csv')
    users = df.to_dict(orient='records')
    for u in users:
        # поддержка старого CSV без колонки name
        if 'name' not in u or pd.isna(u.get('name')):
            u['name'] = USER_NAMES.get(u['id'], f'User {u["id"]}')
        u['emoji'] = USER_EMOJIS.get(u['id'], '👤')
    return users


def load_chats():
    df = pd.read_csv(DATA_DIR / 'chats.csv')
    chats = df.to_dict(orient='records')
    for chat in chats:
        raw = str(chat.get('users', ''))
        ids = [int(x) for x in raw.split(';') if x.strip().isdigit()]
        chat['user_ids'] = ids
        chat['participant_count'] = len(ids)
        del chat['users']
    return chats


def load_messages(chat_id=None, user_id=None):
    df = pd.read_csv(DATA_DIR / 'messages.csv')
    if chat_id is not None:
        df = df[df['chat_id'] == int(chat_id)]
    if user_id is not None:
        df = df[df['user_id'] == int(user_id)]
    df = df.sort_values('date')
    messages = df.to_dict(orient='records')
    for m in messages:
        uid = m.get('user_id')
        if uid == 0:   # AI сообщение
            m['user_name']  = 'Ассистент Sber'
            m['user_emoji'] = '🤖'
            m['is_ai']      = True
        else:
            m['user_name']  = USER_NAMES.get(uid, f'User {uid}')
            m['user_emoji'] = USER_EMOJIS.get(uid, '👤')
            m['is_ai']      = False
    return messages


def append_message(user_id: int, chat_id: int, message: str) -> int:
    """Добавляет строку в messages.csv и возвращает новый id."""
    df = pd.read_csv(DATA_DIR / 'messages.csv')
    new_id = int(df['id'].max()) + 1 if not df.empty else 1
    new_row = pd.DataFrame([{
        'id': new_id, 'user_id': user_id,
        'chat_id': chat_id, 'message': message,
        'date': int(time.time()),
    }])
    df = pd.concat([df, new_row], ignore_index=True)
    df.to_csv(DATA_DIR / 'messages.csv', index=False)
    return new_id


# ── Endpoints ─────────────────────────────────────────────────

@api_view(['GET'])
def users_list(request):
    return Response(load_users())


@api_view(['GET'])
def user_detail(request, user_id):
    users = load_users()
    user = next((u for u in users if u['id'] == int(user_id)), None)
    if user is None:
        return Response({'error': 'Not found'}, status=404)
    return Response(user)


@api_view(['GET'])
def chats_list(request):
    chats = load_chats()
    users = {u['id']: u for u in load_users()}
    for chat in chats:
        chat['participants'] = [users[uid] for uid in chat['user_ids'] if uid in users]
    return Response(chats)


@api_view(['GET'])
def chat_detail(request, chat_id):
    chats = load_chats()
    chat = next((c for c in chats if c['id'] == int(chat_id)), None)
    if chat is None:
        return Response({'error': 'Not found'}, status=404)
    users = {u['id']: u for u in load_users()}
    chat['participants'] = [users[uid] for uid in chat['user_ids'] if uid in users]
    return Response(chat)


@api_view(['GET'])
def chat_messages(request, chat_id):
    return Response(load_messages(chat_id=chat_id))


@api_view(['POST'])
def send_message(request, chat_id):
    """
    POST /api/chats/<id>/send/
    Body: { "user_id": 1, "action_text": "Я съел яблоко" }
    → Сохраняет сообщение + получает ответ от GigaChat → сохраняет AI-ответ
    → Возвращает { user_message, ai_message }
    """
    user_id     = int(request.data.get('user_id', 1))
    action_text = request.data.get('action_text', '').strip()
    if not action_text:
        return Response({'error': 'action_text is required'}, status=400)

    # Загружаем цель пользователя
    users      = load_users()
    user       = next((u for u in users if u['id'] == user_id), None)
    user_goal  = user['goal'] if user else 'Быть здоровым'
    user_name  = user['name'] if user else f'User {user_id}'

    # Форматируем сообщение от пользователя
    user_msg_text = f"{user_name}: {action_text}"

    # Сохраняем сообщение пользователя
    append_message(user_id, chat_id, user_msg_text)

    # Получаем историю для контекста
    history = [m['message'] for m in load_messages(user_id=user_id)]

    # Получаем AI-ответ (GigaChat или fallback)
    ai_text = get_ai_response(
        user_id=user_id,
        action_text=action_text,
        history=history,
        user_goal=user_goal,
    )

    # Сохраняем AI-ответ (user_id=0 означает бот)
    append_message(0, chat_id, ai_text)

    # Возвращаем оба сообщения
    msgs = load_messages(chat_id=chat_id)
    last_two = msgs[-2:]
    return Response({
        'user_message': last_two[0] if len(last_two) > 0 else None,
        'ai_message':   last_two[1] if len(last_two) > 1 else None,
    })


@api_view(['GET'])
def stats(request):
    users    = load_users()
    chats    = load_chats()
    messages = load_messages()

    total_messages = len([m for m in messages if not m['is_ai']])
    active_users   = len(set(m['user_id'] for m in messages if not m['is_ai']))

    msg_per_user = {}
    for m in messages:
        if m['is_ai']:
            continue
        uid = m['user_id']
        msg_per_user[uid] = msg_per_user.get(uid, 0) + 1

    leaderboard = sorted([
        {
            'user_id':        uid,
            'user_name':      USER_NAMES.get(uid, f'User {uid}'),
            'user_emoji':     USER_EMOJIS.get(uid, '👤'),
            'activity_count': cnt,
            'goal':           next((u['goal'] for u in users if u['id'] == uid), ''),
        }
        for uid, cnt in msg_per_user.items()
    ], key=lambda x: x['activity_count'], reverse=True)

    return Response({
        'total_messages':    total_messages,
        'active_users':      active_users,
        'leaderboard':       leaderboard,
        'group_goal':        chats[0]['goal'] if chats else None,
        'participant_count': chats[0]['participant_count'] if chats else 0,
    })
