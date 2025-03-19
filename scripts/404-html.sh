#!/bin/bash
# injects a script in 404 to help redirect URL without .html extension
# FIXME: this is a temporary workaround!

cat > script_tag.txt << EOL
<script>
if (!window.location.pathname.endsWith(".html") && !window.location.pathname.endsWith("/")) {
  window.location.href = window.location.pathname + ".html" + window.location.search;
}
</script>
EOL

# this doesn't work on macOS
sed -i '/<\/head>/i '"$(cat script_tag.txt)" .vitepress/dist/404.html
