import Zabiray.func_response as func_response
import pandas as pd

from numpy.char import capitalize
import Zabiray.func_response as func_response
import pandas as pd

def personal_response(user_id, action_text):
    history = pd.read_csv("messages.csv")
    user_history_indicator = (history["user_id"] == user_id)
    history = history[user_history_indicator].sort_values(by="date", ascending=False)
    history = history["message"].values
    
    user_goal = pd.read_csv("users.csv")
    user_goal = user_goal.loc[user_goal['id'] == int(user_id), 'goal'].values[0]

    prompt = f"""
    Проанализируй прогресс достижения цели.

    ЦЕЛЬ ПОЛЬЗОВАТЕЛЯ: {user_goal}
    ПРЕДЫДУЩИЕ ДЕЙСТВИЯ:
    {"\n".join(history) if len(history) > 0 else "История пуста"}

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
    
    # Получаем ответ от AI
    ai_raw_response = func_response.response(prompt)
    
    # Парсим ответ
    text_part, digit_part = ai_raw_response.rsplit(':', 1)
    digit = max(int(digit_part), 0)
    text = text_part.strip('[]').capitalize()
    
    # Добавляем рекомендацию если оценка низкая
    if digit < 3:
        text += ". Обратитесь к нашему специалисту в <a href='https://sberhealth.ru/?utm_referrer=https%3a%2f%2fwww.google.com%2f'>СберЗдоровье</a>"
    
    # Возвращаем структурированный результат
    return {
        'text': text,
        'digit': digit
    }