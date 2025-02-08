#!/bin/bash

# Load environments
source env-template
    
echo $pwd
echo "" > .env
# Loop through environment variables
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    if [[ "$key" =~ ^#|^$ ]]; then
        continue
    fi

    eval expanded_value="$value"
    echo "$key=$expanded_value" >> .env
   
     # Create folders ony for variables "_IN_HOST"

    if [[ "$key" == *_IN_HOST ]]; then
        mkdir -p "$expanded_value"
        chmod -R 777 "$expanded_value"
        echo "${expanded_value} Created"

    fi

done < <(cat env-template)