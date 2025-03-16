#!/bin/bash
set -e

# Ensure we're in the project root
cd "$(dirname "$0")/.."

# Determine version bump type
if [ "$1" != "patch" ] && [ "$1" != "minor" ] && [ "$1" != "major" ]; then
  echo "Usage: $0 <patch|minor|major>"
  exit 1
fi

# Get current version
current_version=$(node -p "require('./package.json').version")
echo "Current version: $current_version"

# Bump version
npm version $1

# Get new version
new_version=$(node -p "require('./package.json').version")
echo "New version: $new_version"

# Push to GitHub with tags
git push origin master --tags

echo "Version $new_version has been created and pushed to GitHub."
echo "The GitHub Actions workflow will now:"
echo "1. Build and publish to npm"
echo "2. Create a GitHub release with auto-generated release notes" 