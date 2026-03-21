import pandas as pd

if __name__ == "__main__":
    chats = pd.DataFrame({"id":[1], "goal": ["Взобраться на Эверест в 2030-м"], "users":["1;2;3"]})
    chats = chats.set_index('id')

    users = pd.DataFrame({"id":[1,2,3], "goal":["Похудеть на 10 килограмм", "Построить дисциплину, питаться правильно без чипсиков", "Жать 100ку 10 раз через год"]})
    users = users.set_index('id')

    dates = pd.date_range(start='2026-03-21', periods=5, freq='min')

    timestamps = dates.astype('int64') // 10**9

    messages = pd.DataFrame({"id":[1,2,3,4,5], "user_id":[1,1,2,2,3], "chat_id":[1,1,1,1,1], "message": ["Рома съел яблоко, это приблизило его к цели закрытия нормы каллорий на сегодня", "Рома пробежал 2 километра, и сжег 200 ккал", "Иван съел суп с морковью, и он на пути к дисциплине", "Иван сделал 4 подхода подтягиваний на протяжении 5 дней!", "Влад пожал 70 кг 10 раз, осталось 30 килограм до цели"], "date":timestamps})
    messages = messages.set_index("id")

    chats.to_csv("chats.csv")
    messages.to_csv("messages.csv")
    users.to_csv("users.csv")