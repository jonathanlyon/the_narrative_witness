#!/bin/zsh

set -e

REPOSITORY_DIR="$(cd "$(dirname "$0")/.." && pwd)"
COMMENTS_FILE="$(osascript -e 'POSIX path of (choose file with prompt "Choose the Facebook comments CSV")')"

cd "$REPOSITORY_DIR"
npm run recognition:import -- "$COMMENTS_FILE"
npm run lint
npm run build

echo
echo "Recognition has been updated and checked."
echo "Review content/reader-recognition.csv, then publish the changes when ready."
read "?Press Return to close."
