# Git Worktree Setup Guide

## Overview

You now have **3 separate working directories** for parallel development on the same repository:

```
Parent Directory Structure:
├── expense-tracker-ai/              # Main worktree (feature-data-export-v3)
├── expense-tracker-import/          # Import feature worktree
└── expense-tracker-analytics/       # Analytics feature worktree
```

## Worktree Configuration

### 1. Main Worktree (Current)
- **Location**: `/home/rod/github/expense-tracker-ai`
- **Branch**: `feature-data-export-v3`
- **Purpose**: Export Hub feature development
- **Commit**: `4ca91c7a` - Added next library

### 2. Import Feature Worktree
- **Location**: `/home/rod/github/expense-tracker-import`
- **Branch**: `feature/data-import` (new)
- **Purpose**: Data Import system (CSV, PDF, JSON imports)
- **Base Commit**: `db1a911c` - Added gitignore (from main branch)

### 3. Analytics Dashboard Worktree
- **Location**: `/home/rod/github/expense-tracker-analytics`
- **Branch**: `feature/analytics-dashboard` (new)
- **Purpose**: Analytics dashboard with charts, insights, and trends
- **Base Commit**: `db1a911c` - Added gitignore (from main branch)

## What Each Worktree Contains

### Complete Isolation

Each worktree is a **fully functional working directory** with:

✅ **Full codebase** - All source files from the base commit
✅ **Independent .git file** - Links to the shared repository
✅ **Separate branch** - Can switch branches independently
✅ **Own node_modules** - Can have different dependencies
✅ **Own build artifacts** - Independent .next/ directories
✅ **Own uncommitted changes** - Working directory changes don't affect other worktrees

### Shared Repository Data

All worktrees share:
- Git object database (commits, blobs, trees)
- Git configuration
- Remote tracking information
- Branches and tags

## How They're Isolated

### 1. File System Isolation

```bash
# Each worktree is a separate directory
/home/rod/github/expense-tracker-ai/        # Independent files
/home/rod/github/expense-tracker-import/    # Independent files
/home/rod/github/expense-tracker-analytics/ # Independent files
```

**What this means**:
- Changes in one worktree don't affect files in another
- Each can run its own dev server simultaneously
- Each can have different installed npm packages
- Build artifacts are completely separate

### 2. Branch Isolation

```bash
# Each worktree can only checkout ONE branch at a time
Main:      feature-data-export-v3
Import:    feature/data-import
Analytics: feature/analytics-dashboard
```

**Protection mechanism**:
- You **cannot** checkout `feature/data-import` in the analytics worktree
- Git prevents the same branch from being checked out in multiple worktrees
- This prevents conflicts and confusion

### 3. Git State Isolation

Each worktree has its own:
- **HEAD** pointer (current commit)
- **Index** (staging area)
- **Working directory status**
- **Stash** (uncommitted changes storage)

**Example**:
```bash
# In import worktree
git add new-import-feature.ts
git status  # Shows staged file

# In analytics worktree
git status  # Shows clean working directory (unaffected)
```

## Working with Worktrees

### Navigate Between Worktrees

```bash
# Go to import feature
cd ../expense-tracker-import

# Go to analytics feature
cd ../expense-tracker-analytics

# Go back to main worktree
cd ../expense-tracker-ai
```

### Start Development in Each Worktree

**In Import Worktree**:
```bash
cd ../expense-tracker-import

# Install dependencies (if not already installed)
npm install

# Start dev server on default port (3000)
npm run dev

# Make changes
# ... develop import feature ...

# Commit changes
git add .
git commit -m "feat: implement CSV import functionality"
```

**In Analytics Worktree**:
```bash
cd ../expense-tracker-analytics

# Install dependencies
npm install

# Start dev server on different port to avoid conflicts
PORT=3001 npm run dev

# Make changes
# ... develop analytics dashboard ...

# Commit changes
git add .
git commit -m "feat: add spending trends chart"
```

### View All Worktrees

```bash
git worktree list

# Output:
# /home/rod/github/expense-tracker-ai         4ca91c7a [feature-data-export-v3]
# /home/rod/github/expense-tracker-analytics  db1a911c [feature/analytics-dashboard]
# /home/rod/github/expense-tracker-import     db1a911c [feature/data-import]
```

### Check Worktree Status from Anywhere

```bash
# From any worktree, you can see all worktrees
git worktree list

# Get detailed info about a specific worktree
git worktree list --porcelain
```

## Parallel Development Workflow

### Typical Day of Development

**Morning - Work on Import Feature**:
```bash
cd ../expense-tracker-import
npm run dev           # Start on port 3000
# ... develop import feature ...
git add .
git commit -m "feat: add PDF import parser"
```

**Afternoon - Work on Analytics**:
```bash
cd ../expense-tracker-analytics
PORT=3001 npm run dev  # Start on port 3001
# ... develop analytics dashboard ...
git add .
git commit -m "feat: add category spending pie chart"
```

**No conflicts** - Both dev servers can run simultaneously!

### Running Both Features at Once

```bash
# Terminal 1
cd ../expense-tracker-import
npm run dev  # Runs on http://localhost:3000

# Terminal 2
cd ../expense-tracker-analytics
PORT=3001 npm run dev  # Runs on http://localhost:3001
```

Now you can test both features side by side!

## Git Operations

### Committing Changes

Each worktree commits independently:

```bash
# In import worktree
cd ../expense-tracker-import
git add components/import/CSVImporter.tsx
git commit -m "feat: implement CSV file parser"

# In analytics worktree
cd ../expense-tracker-analytics
git add components/dashboard/SpendingChart.tsx
git commit -m "feat: add spending trends visualization"

# Commits are independent but stored in same repository
```

### Pushing Branches

```bash
# Push import feature
cd ../expense-tracker-import
git push -u origin feature/data-import

# Push analytics feature
cd ../expense-tracker-analytics
git push -u origin feature/analytics-dashboard
```

### Creating Pull Requests

Each feature can have its own PR:

```bash
# Create PR for import feature
cd ../expense-tracker-import
gh pr create --title "Add Data Import System" --body "Implements CSV, PDF, JSON import"

# Create PR for analytics feature
cd ../expense-tracker-analytics
gh pr create --title "Add Analytics Dashboard" --body "Adds charts, insights, and trends"
```

### Merging to Main

```bash
# After import PR is approved and merged
cd ../expense-tracker-import
git checkout main
git pull origin main

# After analytics PR is approved and merged
cd ../expense-tracker-analytics
git checkout main
git pull origin main
```

## Cleaning Up Worktrees

### Remove a Worktree (After Feature is Complete)

```bash
# Option 1: From any worktree
git worktree remove ../expense-tracker-import

# Option 2: Delete directory first, then prune
rm -rf ../expense-tracker-import
git worktree prune

# Verify removal
git worktree list
```

### When to Remove

✅ **Remove when**:
- Feature is merged to main
- Feature is abandoned
- No longer need parallel development

❌ **Don't remove if**:
- Still developing the feature
- Need to switch back occasionally
- Want to keep work-in-progress

## Handling Conflicts

### Merge Conflicts Between Features

If both features modify the same files, you'll need to handle conflicts when merging:

```bash
# Update your feature branch with latest main
cd ../expense-tracker-import
git checkout feature/data-import
git fetch origin
git merge origin/main

# Resolve conflicts if any
# ... edit conflicting files ...
git add .
git commit
```

### Preventing Conflicts

**Best Practices**:
1. **Separate file ownership** - Import feature touches import/, analytics touches dashboard/
2. **Communicate changes** - If modifying shared files, coordinate with yourself
3. **Regular syncing** - Periodically merge main into feature branches
4. **Small, focused changes** - Keep features independent when possible

## Advanced Usage

### Switch Branches in a Worktree

```bash
cd ../expense-tracker-import

# Create and switch to a sub-feature branch
git checkout -b feature/data-import-csv

# Switch back
git checkout feature/data-import
```

**Remember**: You can't checkout a branch that's already checked out in another worktree!

### Move a Worktree

```bash
# Move the worktree to a new location
git worktree move ../expense-tracker-import ../expense-tracker-import-new

# Verify
git worktree list
```

### Lock a Worktree

Prevent accidental deletion:

```bash
git worktree lock ../expense-tracker-import --reason "Active development"

# Unlock later
git worktree unlock ../expense-tracker-import
```

### Repair Broken Worktree Links

If you manually move directories:

```bash
git worktree repair
```

## File System Considerations

### .git File vs .git Directory

**Main worktree**: Has a `.git/` directory (full repository)

**Additional worktrees**: Have a `.git` file (pointer to main repository)

```bash
# In import/analytics worktrees
cat .git
# Output: gitdir: /home/rod/github/expense-tracker-ai/.git/worktrees/expense-tracker-import
```

### Shared Git Data Location

All Git data is stored in the main worktree:

```
expense-tracker-ai/.git/
├── worktrees/
│   ├── expense-tracker-import/      # Import worktree Git data
│   │   ├── HEAD                     # Current commit
│   │   ├── index                    # Staging area
│   │   └── logs/                    # Reflog
│   └── expense-tracker-analytics/   # Analytics worktree Git data
│       ├── HEAD
│       ├── index
│       └── logs/
├── objects/                         # Shared object database
├── refs/                            # Shared references
└── config                           # Shared configuration
```

## Troubleshooting

### Problem: Can't checkout a branch

```
fatal: 'feature/data-import' is already checked out at '/home/rod/github/expense-tracker-import'
```

**Solution**: The branch is checked out in another worktree. Switch to a different branch or use that worktree.

### Problem: Port already in use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**: Use different ports for each dev server:
```bash
# Import worktree
npm run dev  # Default port 3000

# Analytics worktree
PORT=3001 npm run dev
```

### Problem: node_modules conflicts

**Solution**: Each worktree needs its own `node_modules`:
```bash
cd ../expense-tracker-import
npm install

cd ../expense-tracker-analytics
npm install
```

### Problem: Lost track of worktrees

**Solution**: List all worktrees:
```bash
git worktree list
```

## Best Practices

### ✅ Do's

- **Use separate ports** for dev servers in each worktree
- **Commit regularly** in each worktree to avoid losing work
- **Keep features independent** to minimize merge conflicts
- **Remove worktrees** after features are merged
- **Use descriptive branch names** (feature/data-import, feature/analytics-dashboard)

### ❌ Don'ts

- **Don't checkout the same branch** in multiple worktrees
- **Don't manually edit .git files** in worktrees
- **Don't share node_modules** between worktrees
- **Don't forget to push** changes from each worktree
- **Don't delete worktree directories** without `git worktree remove`

## Quick Reference Commands

```bash
# Create worktree
git worktree add -b <branch-name> <path> <base-branch>

# List worktrees
git worktree list

# Remove worktree
git worktree remove <path>

# Prune deleted worktrees
git worktree prune

# Move worktree
git worktree move <old-path> <new-path>

# Lock/unlock worktree
git worktree lock <path>
git worktree unlock <path>

# Repair worktrees
git worktree repair
```

## Summary

Your setup allows you to:

✅ Work on **import** and **analytics** features simultaneously
✅ Run **both dev servers** at the same time (different ports)
✅ **Commit and push** independently without conflicts
✅ **Test both features** side by side
✅ **Avoid branch switching** and context switching overhead
✅ Keep each feature's **dependencies isolated**

**Happy parallel development!** 🚀

---

**Created**: 2025-12-15
**Worktrees Created**:
- `/home/rod/github/expense-tracker-import` (feature/data-import)
- `/home/rod/github/expense-tracker-analytics` (feature/analytics-dashboard)
