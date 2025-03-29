#!/bin/bash
# uses yq to modify YAML frontmatter

add_department() {
  local path="$1"
  local department="$2"

  find content/grad-application/"$path" -type f -name "*.md" | while read -r file; do
    if [[ $(basename "$file") == "index.md" ]]; then
      continue
    fi

    echo "Processing: $file"
    DEPARTMENT="$department" yq -i --front-matter=process ".department = env(DEPARTMENT)" "$file"
  done
}

add_department biology bio
add_department biomedical-engineering bme
add_department chemistry chem
add_department computer-science-and-engineering cse
add_department earth-and-space-science ess
add_department electronic-and-electrical-engineering eee
add_department environmental-science-and-engineering ese
add_department finance business
add_department information-systems-and-management-engineering business
add_department marine-science-and-engineering ocean
add_department materials-science-and-engineering mse
add_department math math
add_department mechanical-and-energy-engineering mee
add_department mechanics-and-aerospace-engineering mae
add_department medicine med
add_department microelectronics sme
add_department physics phy
add_department sdim sdim

# overrides
add_department math/statistics stat-ds
