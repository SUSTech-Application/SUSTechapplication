#!/bin/bash

# FIXME: this is a temporary workaround!
# see https://vitepress.dev/guide/routing#dynamic-routes

echo "generating .paths.js files for bracket routes..."

files=$(find docs -type f -name "*\[*\]*.md")

for file in $files; do
  dir=$(dirname "$file")
  base=$(basename "$file" .md)
  region=$(echo "$base" | sed 's/.*\[\(.*\)\].*/\1/')
  paths_file="$dir/$base.paths.js"
  echo "
    export default { paths() { return [ { params: { $region: \"[$region]\" } } ] } }
    " > "$paths_file"
done
