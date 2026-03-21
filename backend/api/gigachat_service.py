"""
Сервис для работы с GigaChat.
Использует промпт из personal_response.py — возвращает [text]:digit.
"""
import random
from pathlib import Path

KEY_PATH = Path(__file__).resolve().parent.parent.parent / 'response' / 'authorization_key.txt'


def _mock_response(user_goal: str, action_text: str) -> str:
    tips = [
        f"Отличное действие! Это определённо приближает тебя к цели «{user_goal}». +1 к прогрессу 🔥",
        f"Ты на правильном пути к «{user_goal}»! Систематичность — ключ к успеху 💪",
        f"Каждый шаг считается. Это действие даёт +7% к прогрессу 📈",
    ]
    return random.choice(tips)


def _build_prompt(user_goal: str, action_text: str, history: list[str]) -> str:
    history_str = "\n".join(history[-5:]) if history else "История пуста"
    return f"""
Проанализируй прогресс достижения цели.

ЦЕЛЬ ПОЛЬЗОВАТЕЛЯ: {user_goal}
ПРЕДЫДУЩИЕ ДЕЙСТВИЯ:
{history_str}

ПОСЛЕДНЕЕ ДЕЙСТВИЕ: {action_text}

Твоя задача:
1. Выступи в роли эксперта и оцени эффективность ПОСЛЕДНЕГО действия для достижения цели.
2. Присвой этому действию числовой балл (digit) >= 0. Чем больше действие вносит вклад в достижение цели и чем оно сложнее, тем выше балл. Если действие бесполезно — поставь 0.
3. Напиши краткое обоснование оценки (text) в одно предложение.

Формат ответа СТРОГО:
[text]:digit

Требования:
- digit: положительное число (награда за действие).
- text: лаконичный комментарий.
- ЗАПРЕЩЕНО писать любые вводные слова или пояснения. Только строка [text]:digit.
- ЗАПРЕЩЕНО использовать двоеточие внутри квадратных скобок.

Пример:
[Действие напрямую способствует цели, так как решает ключевую задачу проекта]:50
"""


def _parse_response(raw: str) -> str:
    """Парсит [text]:digit → возвращает только text."""
    try:
        text_part, digit_part = raw.strip().rsplit(':', 1)
        score = max(int(digit_part.strip()), 0)
        text = text_part.strip().strip('[]')
        return f"{text} (+{score} очков) 🎯"
    except Exception:
        return raw.strip()


def _build_group_prompt(group_goal: str, history: list[str]) -> str:
    history_str = "\n".join(history) if history else "История пуста"
    return f"""
Ты эксперт по оценке эффективности групповой работы.

ЦЕЛЬ ГРУППЫ: {group_goal}

ИСТОРИЯ ДЕЙСТВИЙ (последние сообщения):
{history_str}

Задача: Оцени общую эффективность группы в достижении цели одним числом от 0 до 100.

Критерии оценки:
- 0-20: Действия не соответствуют цели или группа не активна
- 21-40: Есть незначительный прогресс, но требуются улучшения
- 41-60: Умеренный прогресс, группа движется в правильном направлении
- 61-80: Хороший прогресс, действия эффективны
- 81-100: Отличный прогресс, группа максимально эффективна

Формат ответа СТРОГО:
[Краткое обоснование оценки одним предложением]:число

Требования:
- число: целое от 0 до 100
- обоснование: одно предложение, без двоеточий внутри
- ЗАПРЕЩЕНО писать любые вводные слова или пояснения вне формата

Пример:
[Группа активно обсуждает задачи и делает конкретные шаги к цели]:75
"""


def get_group_summary(group_goal: str, history: list[str]) -> dict:
    """
    Генерирует групповую сводку через GigaChat.
    Возвращает { text, score }.
    """
    mock = {
        'text': 'Группа активно движется к цели — сегодня выполнено много полезных действий',
        'score': min(100, len(history) * 5),
    }

    if not KEY_PATH.exists():
        return mock

    try:
        with open(KEY_PATH) as f:
            key = f.readline().strip()

        from gigachat import GigaChat
        from gigachat.models import Chat, Messages, MessagesRole

        prompt = _build_group_prompt(group_goal, history)

        with GigaChat(credentials=key, verify_ssl_certs=False) as giga:
            msg = Messages(role=MessagesRole.USER, content=prompt)
            res = giga.chat(Chat(messages=[msg]))
            raw = res.choices[0].message.content.strip()

        text_part, digit_part = raw.rsplit(':', 1)
        return {
            'text':  text_part.strip().strip('[]'),
            'score': max(0, min(100, int(digit_part.strip()))),
        }

    except Exception as e:
        print(f"[GigaChat group_summary error] {e}")
        return mock


def get_ai_response(user_id: int, action_text: str, history: list[str], user_goal: str) -> str:
    """
    Вызывает GigaChat или возвращает mock-ответ.
    history — список предыдущих сообщений пользователя.
    """
    if not KEY_PATH.exists():
        return _mock_response(user_goal, action_text)

    try:
        with open(KEY_PATH) as f:
            key = f.readline().strip()

        from gigachat import GigaChat
        from gigachat.models import Chat, Messages, MessagesRole

        prompt = _build_prompt(user_goal, action_text, history)

        with GigaChat(credentials=key, verify_ssl_certs=False) as giga:
            msg = Messages(role=MessagesRole.USER, content=prompt)
            res = giga.chat(Chat(messages=[msg]))
            raw = res.choices[0].message.content
            return _parse_response(raw)

    except Exception as e:
        print(f"[GigaChat error] {e}")
        return _mock_response(user_goal, action_text)
