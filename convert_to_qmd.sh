#!/bin/bash

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "Error: pandoc is not installed. Please install pandoc first."
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p chapters

# Convert all .docx files in the chapters directory
for file in chapters/md/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .md)
        echo "Converting $file to qmd..."
        cp "$file" "chapters/${filename}.qmd"
    fi
done

echo "Conversion complete! Files are saved in the chapters directory." 