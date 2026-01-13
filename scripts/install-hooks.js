#!/usr/bin/env node

/**
 * Git Hooks Installer
 *
 * This script installs the pre-push hook that triggers deployment tracking.
 * Run this once after cloning the repository or when setting up a new dev environment.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

function installPrePushHook() {
  const gitHooksDir = path.join(__dirname, '..', '.git', 'hooks');
  const prePushHookPath = path.join(gitHooksDir, 'pre-push');
  const prePushScriptPath = path.join(__dirname, 'pre-push.js');

  // Check if .git directory exists
  if (!fs.existsSync(path.join(__dirname, '..', '.git'))) {
    logError('Not a git repository - .git directory not found');
    return false;
  }

  // Create hooks directory if it doesn't exist
  if (!fs.existsSync(gitHooksDir)) {
    fs.mkdirSync(gitHooksDir, { recursive: true });
    logInfo('Created .git/hooks directory');
  }

  // Check if pre-push hook already exists
  if (fs.existsSync(prePushHookPath)) {
    logWarning('pre-push hook already exists');
    logInfo('Reading existing hook...');

    const existingContent = fs.readFileSync(prePushHookPath, 'utf-8');

    // Check if it's our hook
    if (existingContent.includes('pre-push.js')) {
      logInfo('Existing hook is our deployment tracking hook - updating...');
    } else {
      logWarning('Existing hook is NOT our deployment tracking hook');
      logWarning('Backing up existing hook to pre-push.backup');
      fs.writeFileSync(`${prePushHookPath}.backup`, existingContent, 'utf-8');
    }
  }

  // Create the pre-push hook that calls our Node.js script
  const hookContent = `#!/bin/sh
#
# Pre-push hook for deployment tracking
# Automatically installed by scripts/install-hooks.js
#

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Run the Node.js pre-push script
node "$PROJECT_ROOT/scripts/pre-push.js"

# Exit with the same code as the Node.js script
exit $?
`;

  fs.writeFileSync(prePushHookPath, hookContent, 'utf-8');

  // Make the hook executable
  fs.chmodSync(prePushHookPath, '755');

  logSuccess('pre-push hook installed successfully!');
  return true;
}

function checkEnvironmentVariables() {
  const envPath = path.join(__dirname, '..', '.env.local');

  if (!fs.existsSync(envPath)) {
    logWarning('.env.local file not found');
    logInfo('Copy .env.example to .env.local and fill in the values');
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');

  const requiredVars = ['PVS_WEBSITE_ID', 'PVS_API_URL', 'PVS_BASE_URL'];
  const missingVars = [];

  requiredVars.forEach((varName) => {
    if (!envContent.includes(varName)) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    logWarning('Missing required environment variables in .env.local:');
    missingVars.forEach((varName) => {
      log(`  - ${varName}`, 'yellow');
    });
    logInfo('Add these variables to .env.local (see .env.example)');
    return false;
  }

  logSuccess('All required environment variables found');
  return true;
}

// Main execution
function main() {
  log('\n🔧 Installing Git hooks for deployment tracking...\n', 'bold');

  // Install pre-push hook
  const hookInstalled = installPrePushHook();

  if (!hookInstalled) {
    log('\n❌ Failed to install hooks\n', 'red');
    process.exit(1);
  }

  // Check environment variables
  log('\n📝 Checking environment variables...\n', 'cyan');
  const envOk = checkEnvironmentVariables();

  if (!envOk) {
    log('\n⚠️  Hooks installed but environment variables need attention\n', 'yellow');
    log('The pre-push hook will skip deployment tracking if env vars are missing\n', 'yellow');
  } else {
    log('\n✅ Setup complete! Deployment tracking is active.\n', 'green');
  }

  log('📚 How it works:', 'cyan');
  log('  1. Update docs/deployment_summary.md with your changes');
  log('  2. Commit your code');
  log('  3. Run `git push` - the hook will automatically track the deployment');
  log('  4. The deployment_summary.md file will be reset after successful tracking\n');
}

main();
