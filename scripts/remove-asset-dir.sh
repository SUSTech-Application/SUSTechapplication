#!/bin/bash

# Find all index.md files in the docs folder
find content -name "index.md" | while read file; do
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS version (BSD sed)
    sed -i '' -E 's/!\[(.*)\]\(\.?\/(.*\/)?([^\/]+)\)/![\1](\3)/g' "$file"
  else
    # Linux version (GNU sed)
    sed -i -E 's/!\[(.*)\]\(\.?\/(.*\/)?([^\/]+)\)/![\1](\3)/g' "$file"
  fi
  echo "Processed $file"
done
