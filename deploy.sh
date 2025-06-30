#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required commands
for cmd in git node npm; do
  if ! command_exists "$cmd"; then
    echo -e "${RED} Error: $cmd is not installed. Please install it and try again.${NC}" >&2
    exit 1
  fi
done

# Check Node.js version
NODE_VERSION=$(node -v)
if [[ $NODE_VERSION =~ ^v(1[6-9]|2[0-9]|3[0-9])\. ]]; then
  echo -e "${GREEN} Using Node.js $NODE_VERSION${NC}"
else
  echo -e "${YELLOW}  Warning: You're using Node.js $NODE_VERSION. For best results, use Node.js 16 or higher.${NC}"
  read -p "Continue anyway? [y/N] " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED} Deployment cancelled.${NC}"
    exit 1
  fi
fi

echo -e "${YELLOW} Starting deployment process...${NC}"

# Install dependencies if needed
echo -e "\n${YELLOW} Installing dependencies...${NC}"
npm install --legacy-peer-deps

# Build the project
echo -e "\n${YELLOW} Building project...${NC}"
VITE_BASE_URL="/Sahil-Portfolio/" npm run build

# Create necessary files for GitHub Pages
echo -e "\n${YELLOW} Setting up GitHub Pages configuration...${NC}"

# Ensure dist directory exists
mkdir -p dist

# Create .nojekyll file to prevent GitHub Pages from processing the site with Jekyll
echo "" > dist/.nojekyll

# Copy CNAME file if it exists
if [ -f "CNAME" ]; then
  echo -e "${YELLOW} Copying CNAME file...${NC}" 
  cp CNAME dist/
fi

# Initialize git repository if it doesn't exist
if [ ! -d ".git" ]; then
  echo -e "${YELLOW} Initializing git repository...${NC}"
  git init
  git remote add origin https://github.com/sahilthecoder/Sahil-Portfolio.git
fi

# Add all files to git
echo -e "\n${YELLOW} Staging files...${NC}"
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
  echo -e "${YELLOW} No changes to commit.${NC}"
else
  # Commit changes
  echo -e "\n${YELLOW} Committing changes...${NC}"
  git commit -m "Deploy to GitHub Pages"
fi

# Push to the gh-pages branch
echo -e "\n${YELLOW} Deploying to GitHub Pages...${NC}"

# Check if the remote exists
if ! git ls-remote --exit-code origin gh-pages >/dev/null 2>&1; then
  echo -e "${YELLOW} Creating orphan branch 'gh-pages'...${NC}"
  git checkout --orphan gh-pages
  git rm -rf .
  git add -f dist/
  git commit -m "Initial GitHub Pages deployment"
  git push origin gh-pages
  git checkout main
fi

# Deploy using subtree push
echo -e "\n${YELLOW} Pushing to GitHub Pages...${NC}"
git subtree push --prefix dist origin gh-pages --squash

# If the above fails, try force pushing (useful for CI/CD)
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}  Push failed, attempting force push...${NC}"
  git push origin `git subtree split --prefix dist main`:gh-pages --force
fi

echo -e "\n${GREEN} Deployment completed successfully!${NC}"
echo -e "Your site should be live at: ${GREEN}https://sahilthecoder.github.io/Sahil-Portfolio/${NC}"
echo -e "\n${YELLOW} Note: It may take a few minutes for GitHub Pages to update.${NC}"

# Open the deployed site in the default browser
if command_exists xdg-open; then
  xdg-open "https://sahilthecoder.github.io/Sahil-Portfolio/"
elif command_exists open; then
  open "https://sahilthecoder.github.io/Sahil-Portfolio/"
fi
