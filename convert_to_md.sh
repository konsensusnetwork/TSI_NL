#!/bin/bash

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "Error: pandoc is not installed. Please install pandoc first."
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p chapters/edited

# Convert all .docx files in the chapters directory
for file in chapters/edited/*.docx; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .docx)
        echo "Converting $file to md..."
        pandoc "$file" -o "chapters/edited/${filename}.md" --wrap=none
    fi
done

echo "Conversion complete! Files are saved in the chapters/edited directory." 