import Zabiray.func_response as func_response
import pandas as pd
import time

def group_response(chat_id, max_attempts=3, delay=1):
    history = pd.read_csv("messages.csv")
    user_history_indicator = (history["chat_id"] == chat_id)
    history = history[user_history_indicator].sort_values(by="date", ascending=False)
    history = history["message"].values
    
    group_goal = pd.read_csv("chats.csv")
    group_goal = group_goal.loc[group_goal['id'] == int(chat_id), 'goal'].values[0]

    prompt = f"""
    Ты эксперт по оценке эффективности групповой работы.

    ЦЕЛЬ ГРУППЫ: {group_goal}
    
    ИСТОРИЯ ДЕЙСТВИЙ (последние сообщения):
    {"\n".join(history) if history else "История пуста"}

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
    
    for attempt in range(max_attempts):
        try:
            # Получаем ответ от AI
            ai_raw_response = func_response.response(prompt)
            
            # Парсим ответ
            text_part, digit_part = ai_raw_response.rsplit(':', 1)
            
            # Возвращаем структурированный результат
            return {
                'text': text_part.strip('[]'),
                'digit': max(int(digit_part), 0)
            }
            
        except (ValueError, IndexError, AttributeError) as e:
            if attempt == max_attempts - 1:
                # Последняя попытка - возвращаем fallback ответ
                return {
                    'text': 'Ошибка при получении оценки',
                    'digit': 0,
                    'error': str(e)
                }
            else:
                # Ждем перед следующей попыткой
                time.sleep(delay)
                continue