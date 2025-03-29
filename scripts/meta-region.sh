#!/bin/bash
# uses yq to modify YAML frontmatter

find content/grad-application -type f -name "*.md" | while read -r file; do

  # Skip index.md files
  if [[ $(basename "$file") == "index.md" ]]; then
    continue
  fi

  echo "Processing: $file"
  export REGION=$(echo "$file" | sed -n 's/.*\[\([^]]*\)\].*/\1/p')
  echo $REGION
  yq -i --front-matter=process ".region = env(REGION)" "$file"
done
