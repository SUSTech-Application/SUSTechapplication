#!/bin/bash
# injects a script in 404 to help redirect URL without .html extension
# FIXME: this is a temporary workaround!

FILE=".vitepress/dist/404.html"

cat > script.txt << EOL
<script>
if (!window.location.pathname.endsWith(".html") && !window.location.pathname.endsWith("/")) {
  window.location.href = window.location.pathname + ".html" + window.location.search;
}
</script>
EOL

cp "$FILE" "$FILE.bak"

awk '
{
  if (match($0, "</head>")) {
    while (getline line < "script.txt") {
      print line
    }
    close("script.txt")
  }
  print $0
}' "$FILE.bak" > "$FILE"

rm script.txt "$FILE".bak
