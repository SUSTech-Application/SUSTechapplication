#!/bin/bash

# Find all markdown files and process them
find . -type f -name "*.md" | while read -r file; do
  # Use simpler pattern matching with a temporary file approach
  if head -n 10 "$file" | grep -q "^---$" \
    && head -n 10 "$file" | grep "^title:" | wc -l | grep -q "2"; then
    # Create a temporary file
    temp_file=$(mktemp)

    # Process the file: skip the first title line in YAML frontmatter
    awk '
        BEGIN { in_frontmatter=0; title_seen=0; }
        /^---$/ { 
            print; 
            if (in_frontmatter == 0) in_frontmatter=1; 
            else in_frontmatter=0; 
            next; 
        }
        in_frontmatter && /^title:/ {
            if (title_seen == 0) {
                title_seen=1;
                next;  # Skip the first title line
            }
        }
        { print }' "$file" > "$temp_file"

    # Replace the original file
    mv "$temp_file" "$file"
    echo "Fixed duplicate title in: $file"
  fi
done
