#!/bin/bash
# uses yq to modify YAML frontmatter

find content/grad-application -type f -name "*.md" | while read -r file; do

  # Skip index.md files
  if [[ $(basename "$file") == "index.md" ]]; then
    continue
  fi

  echo "Processing: $file"

  export DATE=$(git log --diff-filter=A --format="%ad" --date=short -- $file | tail -1)

  echo date is $date
  yq -i --front-matter=process ".date = env(DATE)" "$file"
done
