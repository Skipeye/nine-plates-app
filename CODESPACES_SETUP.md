# GitHub Codespaces Setup for 9 Plates Android App

## Quick Start Guide

### 1. Upload Project to GitHub
1. Download all files from this project
2. Create a new GitHub repository called `nine-plates-app`
3. Upload all files to your repository

### 2. Open in Codespaces
1. Go to your GitHub repository
2. Click the green "Code" button
3. Click "Codespaces" tab
4. Click "Create codespace on main"

### 3. Build Your Android App Bundle
Once Codespaces loads, run these commands in the terminal:

```bash
# Install dependencies
npm install

# Build the web app
npm run build

# Add Android platform
npx cap add android

# Sync with Capacitor
npx cap sync android

# Install Android SDK components
yes | sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"

# Build the app bundle
cd android && ./gradlew bundleRelease
