#!/bin/bash

# 1. Добавяне на .gitignore ако случайно липсва за uploads
if ! grep -q "public/uploads/*" .gitignore; then
  echo "⚠️ Добавям public/uploads в .gitignore..."
  echo "" >> .gitignore
  echo "# Уникални снимки от огледи" >> .gitignore
  echo "public/uploads/*" >> .gitignore
  echo "!public/uploads/.gitkeep" >> .gitignore
fi

# 2. Проверка за промени
echo "🔍 Проверка на промените..."
git status

# 3. Питане за коментар
echo "📝 Въведи кратко описание на промените (commit message):"
read msg

if [ -z "$msg" ]; then
  msg="Update: $(date +'%Y-%m-%d %H:%M')"
fi

# 4. Изпълнение на Git команди
git add .
git commit -m "$msg"
git push origin main

echo "✅ Кодът е в GitHub!"