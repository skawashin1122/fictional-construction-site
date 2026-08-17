#!/bin/bash
# Deploy Check Script
# Validates paths and publishes to GitHub Pages

set -e

echo "🚀 Deploy Check & Publish"
echo ""

# Step 1: Check for root-relative paths
echo "1️⃣  Checking for root-relative paths..."
if grep -r "href=\"/\|src=\"/\|url(/\|background: url(/" . --include="*.html" --include="*.css" 2>/dev/null | grep -v ".git" | grep -v "node_modules"; then
    echo "❌ Found root-relative paths! Convert to relative paths:"
    echo "   Change: href=\"/css/...\" → href=\"./css/...\""
    echo "   Change: src=\"/assets/...\" → src=\"./assets/...\""
    exit 1
else
    echo "✅ No root-relative paths found"
fi

echo ""
echo "2️⃣  Checking git status..."
git status

echo ""
echo "3️⃣  Ready to commit and push?"
echo "   Usage: git add . && git commit -m 'feat: update project content' && git push origin main"
echo ""
echo "4️⃣  After push, your site will be available at:"
echo "   https://<username>.github.io/<repository>/"
