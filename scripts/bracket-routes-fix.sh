#!/bin/bash

# FIXME: this is a temporary workaround!
# see https://vitepress.dev/guide/routing#dynamic-routes

echo "generating .paths.js files for bracket routes..."

# must be in form of [xx]-xxx

files=$(find content -type f -name '*.md' \( -path '*\[*\]-*' -o -name '*\[*\]-*' \))

for file in $files; do
  dir=$(dirname "$file")
  base=$(basename "$file" .md)
  if [ "$base" != "index" ]; then
    # Default behavior for non-index.md files
    region=$(echo "$base" | sed 's/.*\[\(.*\)\].*/\1/')
  else
    # Special handling for index.md files
    parent_dir=$(basename "$dir")
    region=$(echo "$parent_dir" | sed 's/.*\[\(.*\)\].*/\1/')
  fi
  paths_file="$dir/$base.paths.js"
  echo "
    export default { paths() { return [ { params: { \"$region\": \"[$region]\" } } ] } }
    " > "$paths_file"
done
