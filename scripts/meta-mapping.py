import os
import yaml
import re
from yaml import CDumper  # Use C-based dumper for better performance

def process_md_file(filepath):
    """Extract the basename (without .md) and the value after the final dash."""
    try:
        basename = os.path.splitext(os.path.basename(filepath))[0]
        match = re.search(r'(.*)-([^\-]+)$', basename)
        if match:
            prefix = match.group(1)
            suffix = match.group(2)
            num_match = re.search(r'(\d+)[^\d]*$', prefix)
            value = f"{suffix}{num_match.group(1)}" if num_match else suffix
            return basename, value
        return basename, basename
    except UnicodeEncodeError:
        print(f"Skipping problematic file: {filepath}")
        return None, None

def build_structure(root_dir):
    """Traverse docs/ and build a nested dictionary structure."""
    structure = {}
    root_dir = os.path.abspath(root_dir)
    for dirpath, _, filenames in os.walk(root_dir):
        try:
            rel_path = os.path.relpath(dirpath, root_dir)
            current_level = structure
            if rel_path != '.':
                for part in rel_path.split(os.sep):
                    current_level = current_level.setdefault(part, {})
            for filename in filenames:
                if filename.endswith('.md') and filename != 'index.md':
                    try:
                        full_path = os.path.join(dirpath, filename)
                        key, value = process_md_file(full_path)
                        if key: current_level[key] = value
                    except UnicodeError as e:
                        print(f"Skipping {filename} due to: {e}")
        except UnicodeError as e:
            print(f"Skipping directory {dirpath} due to: {e}")
    return structure

def main():
    docs_dir = 'content'
    output_file = 'output.yaml'
    
    if not os.path.exists(docs_dir):
        print(f"Error: Directory '{docs_dir}' does not exist")
        return
    
    structure = build_structure(docs_dir)
    
    # Write YAML with proper Unicode handling
    with open(output_file, 'w', encoding='utf-8') as f:
        yaml.dump(
            structure,
            f,
            default_flow_style=False,
            sort_keys=False,
            allow_unicode=True,  # << This prevents Unicode escaping
            Dumper=CDumper  # << Uses libyaml for better performance (optional)
        )
    
    print(f"Saved to {output_file} with preserved Unicode characters")

if __name__ == "__main__":
    main()
