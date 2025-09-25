# Vibe coding exercise — Example solution

Это пример репозитория для тестового задания — приложение React + Node.js,
которое записывает аудио с микрофона, отправляет на сервер, где выполняется
STT (Whisper) и полученный текст переводится на испанский при помощи LLM.

**Важное:** этот репозиторий содержит пример кода. Чтобы он работал вам нужно:
1. Установить зависимости (frontend и backend).
2. Создать файл `.env` в папке `backend/` с переменной `OPENAI_API_KEY`.
3. Запустить backend и frontend (см. инструкции ниже).

## Структура
- `frontend/` — Vite + React приложение (запись аудио, UI).
- `backend/` — Express API (приём аудио, вызов OpenAI для транскрипции и перевода).
- `PROMPTS.md` — prompts, которые использовались при разработке.
- `TIME_LOG.md` — лог времени по шагам.

## Быстрый старт (локально)
```bash
# 1) распакуйте/клонируйте репозиторий
cd vibe-coding-exercise

# 2) backend
cd backend
npm install
# создать .env:
# OPENAI_API_KEY=your_api_key_here
npm run dev

# 3) frontend (в другой вкладке терминала)
cd ../frontend
npm install
npm run dev

# По умолчанию фронтенд запустится на http://localhost:5173
# Бэкенд — на http://localhost:3000
# В режиме разработки Vite проксирует /api к backend, настроено в package.json/front-end proxy.
```

## Как запушить в GitHub
```bash
# создать репо на GitHub, затем:
git remote add origin git@github.com:YOUR_USERNAME/vibe-coding-exercise.git
git push -u origin main
# затем дать доступ пользователю @Van0SS (https://github.com/Van0SS) в настройках репозитория
```

## Ограничения
- В этом окружении я не могу автоматически запушить в GitHub за вас — приложен zip с готовым репо, который можно загрузить и опубликовать.
- Не храните секретные ключи в коде. Используйте `.env` и переменные окружения.