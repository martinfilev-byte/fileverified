#!/bin/bash

# Име на изходния файл
OUTPUT="project_snapshot.txt"

# Начало на файла с дата и час
echo "FILEVERIFIED PROJECT SNAPSHOT - $(date)" > $OUTPUT
echo "========================================" >> $OUTPUT

# Списък с файловете, които искаме да включим
# Изключваме node_modules, .next, .git и снимките в uploads
find . -type f \
  -not -path '*/.*' \
  -not -path './node_modules/*' \
  -not -path './.next/*' \
  -not -path './public/uploads/*' \
  -not -path './package-lock.json' \
  \( -name "*.ts" -o -name "*.tsx" -o -name "*.prisma" -o -name "Dockerfile*" -o -name "*.yml" -o -name "*.sh" -o -name "*.css" -o -name "package.json" -o -name "next.config.*" \) \
  | while read -r file; do
    echo "" >> $OUTPUT
    echo "--- START OF FILE: ${file#./} ---" >> $OUTPUT
    cat "$file" >> $OUTPUT
    echo "" >> $OUTPUT
    echo "--- END OF FILE: ${file#./} ---" >> $OUTPUT
  done

echo "✅ Готово! Файлът $OUTPUT е генериран успешно."