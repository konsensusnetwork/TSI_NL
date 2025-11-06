#!/bin/bash

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "Error: pandoc is not installed. Please install pandoc first."
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p docx

# Convert all .qmd files in the chapters directory
for file in chapters/*.qmd; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .qmd)
        echo "Converting $file to docx..."
        pandoc "$file" -o "docx/${filename}.docx"
    fi
done

echo "Conversion complete! Files are saved in the docx directory." 