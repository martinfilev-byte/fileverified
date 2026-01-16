#!/bin/bash
# snapshot.sh - Генерира пълен текстов контекст за AI (Gemini)

OUTPUT="project_snapshot.txt"

echo "FILEVERIFIED PROJECT SNAPSHOT - $(date)" > $OUTPUT
echo "========================================" >> $OUTPUT

# Дефинираме папките и файловите разширения, които ни интересуват
# Изключваме node_modules, .next, .git и други системни папки
find src prisma -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.prisma" -o -name "*.css" \) \
    ! -path "*/node_modules/*" \
    ! -path "*/.next/*" \
    ! -path "*/.git/*" | while read -r f; do
    echo "" >> $OUTPUT
    echo "--- START OF FILE: $f ---" >> $OUTPUT
    cat "$f" >> $OUTPUT
    echo "" >> $OUTPUT
    echo "--- END OF FILE: $f ---" >> $OUTPUT
done

# Добавяме и основните конфигурационни файлове от корена
CONFIG_FILES=("next.config.ts" "compose.yml" "Dockerfile" "package.json" "tailwind.config.ts" "prisma/schema.prisma")

for cfg in "${CONFIG_FILES[@]}"; do
    if [ -f "$cfg" ]; then
        echo "" >> $OUTPUT
        echo "--- START OF CONFIG: $cfg ---" >> $OUTPUT
        cat "$cfg" >> $OUTPUT
        echo "" >> $OUTPUT
        echo "--- END OF CONFIG: $cfg ---" >> $OUTPUT
    fi
done

echo "✅ Snapshot е генериран успешно в $OUTPUT"