import func_response
import pandas as pd

def personal_response(user_id, action_text):
    history = pd.read_csv("messages.csv")
    user_history_indicator = (history["user_id"] == user_id)
    history = history[user_history_indicator].sort_values(by = "date", ascending=False)
    history = history["message"].values  # убираем пустые скобки
    
    user_goal = pd.read_csv("users.csv")
    user_goal = user_goal.loc[user_goal['id'] == int(user_id), 'goal'].values[0]

    prompt = f"цель человека : {user_goal} \n Только что человек совершил действие : {action_text} \n До этого он совершил следующие действия : {"\n".join(history)} \n Пожалуйста, оцени насколько данное действие приблизило человека к его цели учитывая прошлый прогресс (используй числовую характеристику)\n Пожалуйста коротко и ясно"
    
    return func_response.response(prompt)
