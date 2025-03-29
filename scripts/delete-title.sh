#!/bin/bash

# Safely handle filenames with spaces or special chars
find content/ -type f -name "*.md" -print0 | while IFS= read -r -d '' file; do
  # Use sed to delete lines starting with 'title: '. -i.bak creates a backup (optional)
  sed -i.bak '/^title: /d' "$file" && rm -f "$file.bak" # Remove backup if successful
done
