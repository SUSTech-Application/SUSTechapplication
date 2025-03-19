#!/bin/bash
# injects a script in 404 to help redirect URL without .html extension
# FIXME: this is a temporary workaround!

SCRIPT="<script>
if (!window.location.pathname.endsWith(\".html\") && !window.location.pathname.endsWith(\"/\")) {
  window.location.href = window.location.pathname + \".html\" + window.location.search;
}
</script>"

sed -i "s|</head>|$SCRIPT\n</head>|" .vitepress/dist/404.html
