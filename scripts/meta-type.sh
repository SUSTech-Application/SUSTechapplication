#!/bin/bash
# uses yq to modify YAML frontmatter

find content/grad-application -type f -name "*.md" | while read -r file; do

  # Skip index.md files
  if [[ $(basename "$file") == "index.md" ]]; then
    continue
  fi

  echo "Processing: $file"
  export TYPE="grad"
  yq -i --front-matter=process ".type = env(TYPE)" "$file"
done
