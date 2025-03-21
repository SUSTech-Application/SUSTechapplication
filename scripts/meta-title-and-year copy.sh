#!/bin/bash
# uses yq to modify YAML frontmatter

find docs/grad-application -type f -name "*.md" | while read -r file; do

  # Skip index.md files
  if [[ $(basename "$file") == "index.md" ]]; then
    echo "Skipping index file: $file"
    continue
  fi

  echo "Processing: $file"

  if grep -q "^---" "$file" 2> /dev/null; then
    :
  else
    # Add empty frontmatter
    echo "  File has no frontmatter, creating: $file"
    sed -i.bak '1s/^/---\n---\n\n/' "$file"
    rm -f "${file}.bak"
    echo "  Added empty frontmatter to: $file"
  fi

  # Extract year from filename (pattern: something-YEAR-something.md)
  year=$(echo "$file" | grep -o -E '\-[0-9]+\-' | tr -d '-')

  # Extract the first heading content (text after "# ")
  heading=$(grep -m 1 "^# " "$file" | sed 's/^# //')

  if [[ -n "$heading" ]]; then
    # Update frontmatter with the heading as title and extracted year
    yq -i --front-matter=process \
      ".title = \"$heading\" | .year = $year" \
      "$file"
    sed -i 's/date: "\([0-9-]*\)"/date: \1/' "$file" # remove quotes around date

    echo "  Updated: title='$heading', year='$year'"
  else
    echo "  Warning: No heading found in $file"
  fi
done
