# Export Data - User Guide

Welcome to the Export Hub! This guide will help you export and share your expense data in multiple formats using various cloud services.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Opening the Export Hub](#opening-the-export-hub)
3. [Using Export Templates](#using-export-templates)
4. [Cloud Integrations](#cloud-integrations)
5. [Viewing Export History](#viewing-export-history)
6. [Sharing Your Data](#sharing-your-data)
7. [Scheduled Exports](#scheduled-exports)
8. [Tips & Best Practices](#tips--best-practices)
9. [Troubleshooting](#troubleshooting)
10. [FAQ](#faq)

---

## Getting Started

The Export Hub is your one-stop destination for exporting and sharing your expense data. With the Export Hub, you can:

- 📊 **Export in multiple formats** - CSV, JSON, PDF, or Excel
- ☁️ **Save to cloud services** - Google Drive, Dropbox, OneDrive, and more
- 📧 **Email exports** - Send reports directly to your inbox
- 🔗 **Share with others** - Generate secure shareable links with QR codes
- 📜 **Track your exports** - View history of all your exports
- ⏰ **Schedule automatic exports** - Set up recurring exports (coming soon)

### What You'll Need

- **Active expenses**: You must have at least one expense in your tracker
- **Internet connection**: Required for cloud integrations and email exports
- **Cloud accounts** (optional): For saving to Google Drive, Dropbox, etc.

---

## Opening the Export Hub

### Step 1: Locate the Export Hub Button

Look for the **"Export Hub"** button in the header of your expense tracker:

![Export Hub Button Location - Placeholder]

The button is located next to the "Add Expense" button in the top navigation bar.

### Step 2: Click to Open

Click the **"Export Hub"** button to open the export drawer panel.

> **Note**: The Export Hub button is disabled when you have no expenses. Add at least one expense to enable exporting.

### Step 3: Explore the Tabs

The Export Hub has five main tabs:

1. **📋 Templates** - Choose your export template and format
2. **🔗 Integrations** - Connect and export to cloud services
3. **📜 History** - View your past exports
4. **🔗 Share** - Share via email or generate shareable links
5. **⏰ Schedule** - Set up recurring exports (coming soon)

![Export Hub Overview - Placeholder]

---

## Using Export Templates

Export templates are pre-configured export settings designed for specific use cases. Each template includes specific data fields and supports different file formats.

### Available Templates

#### 1. 📊 Standard Export

**Best for**: General purpose export and analysis

**Formats Available**: CSV, JSON, PDF, Excel

**Fields Included**:
- Date
- Category
- Description
- Amount

**When to Use**:
- Importing into other software
- General data backup
- Basic spreadsheet analysis

![Standard Export Template - Placeholder]

#### 2. 🧾 Tax Report

**Best for**: Tax filing and deductions

**Formats Available**: PDF, Excel

**Fields Included**:
- Date
- Category
- Description
- Amount
- Tax Category

**When to Use**:
- Preparing for tax season
- Providing documentation to your accountant
- Claiming business expense deductions

#### 3. 📅 Monthly Summary

**Best for**: Budget reviews and planning

**Formats Available**: PDF, Excel

**Fields Included**:
- Month
- Category
- Total Amount
- Number of Transactions

**When to Use**:
- Monthly budget reviews
- Tracking spending trends over time
- Financial planning meetings

#### 4. 📈 Category Analysis

**Best for**: Identifying spending patterns

**Formats Available**: PDF, Excel

**Fields Included**:
- Category
- Total Amount
- Percentage of Total
- Trend Information

**When to Use**:
- Understanding where your money goes
- Finding opportunities to cut costs
- Creating spending pie charts

#### 5. 🔍 Detailed Breakdown

**Best for**: In-depth analysis and auditing

**Formats Available**: Excel, CSV

**Fields Included**:
- Date
- Category
- Description
- Amount
- Created Date
- Updated Date
- Tags (if applicable)

**When to Use**:
- Detailed financial audits
- Comprehensive expense tracking
- Historical data analysis

#### 6. 📝 Simple List

**Best for**: Quick reference and sharing

**Formats Available**: CSV, PDF

**Fields Included**:
- Date
- Description
- Amount

**When to Use**:
- Quick expense lists
- Sharing simplified reports
- Basic record keeping

### How to Select a Template

1. Open the Export Hub
2. Make sure you're on the **Templates** tab
3. Browse the available templates
4. Click on a template card to select it
5. The selected template will be highlighted with a green border

![Template Selection - Placeholder]

### Choosing a File Format

After selecting a template:

1. View the available formats for your chosen template
2. Click on your desired format (CSV, JSON, PDF, or Excel)
3. The selected format will be highlighted

**Format Comparison**:

| Format | Best For | Size | Compatibility |
|--------|----------|------|---------------|
| **CSV** | Spreadsheets, databases | Smallest | Universal |
| **JSON** | Developer tools, APIs | Small | Technical users |
| **PDF** | Printing, sharing | Medium | Universal viewing |
| **Excel** | Advanced analysis | Largest | Microsoft Office, Google Sheets |

### Understanding Template Details

At the bottom of the Templates tab, you'll see a blue info panel showing:

- **Fields included**: List of all data fields in the export
- **Records**: Number of expense records that will be exported
- **Est. size**: Estimated file size of your export

![Template Details Panel - Placeholder]

This helps you confirm you're exporting the right data before proceeding.

---

## Cloud Integrations

Cloud integrations allow you to export your data directly to popular cloud services without downloading files to your computer.

### Available Cloud Services

#### ✉️ Email

**Status**: Always connected

**What it does**: Sends exports as email attachments

**How to use**: See [Sharing Your Data](#sharing-your-data) section

#### 📗 Google Sheets

**What it does**: Creates a new Google Sheets spreadsheet with your expense data

**Best for**:
- Collaborative budgeting
- Real-time data sharing with family
- Creating custom charts and formulas

#### 💾 Google Drive

**What it does**: Saves export files to your Google Drive

**Best for**:
- Cloud backup
- Accessing exports from any device
- Organizing financial documents

#### 📦 Dropbox

**What it does**: Saves export files to your Dropbox account

**Best for**:
- Syncing across devices
- Sharing with team members
- Automated backup workflows

#### ☁️ OneDrive

**What it does**: Saves export files to Microsoft OneDrive

**Best for**:
- Microsoft 365 users
- Windows integration
- SharePoint sharing

#### 📓 Notion

**What it does**: Creates a database entry in your Notion workspace

**Best for**:
- Personal knowledge management
- Combining expenses with other notes
- Project-based expense tracking

#### 🗂️ Airtable

**What it does**: Exports to an Airtable base

**Best for**:
- Advanced database features
- Custom views and filters
- Team collaboration

### Connecting a Cloud Service

![Connecting Cloud Service - Placeholder]

1. Open the Export Hub
2. Click on the **Integrations** tab
3. Find the service you want to connect
4. Click the **Connect** button next to the service
5. Follow the authentication prompts (if applicable)
6. Once connected, the status will change to **connected** with a green badge

> **Note**: In the current version, authentication is simulated. When you click "Connect," the service is marked as connected. In a production environment, you would be redirected to the service's login page to authorize access.

### Disconnecting a Cloud Service

1. Go to the **Integrations** tab
2. Find the connected service
3. Click the **Disconnect** button
4. The service status will change to **disconnected**

### Exporting to a Cloud Service

![Export to Cloud Service - Placeholder]

Once you've connected a cloud service:

1. Make sure the service is connected (green **connected** badge)
2. Click the **Connect** button again if you want to select it for export
3. A green panel will appear showing export options
4. Review the export details:
   - Number of expenses being exported
   - Destination service name
5. Click the **Export to [Service Name]** button
6. Wait for the export to complete (usually 2-3 seconds)
7. You'll see a success message when the export is complete
8. The export will be added to your History tab

### Opening Your Export

After a successful export:

1. Go to the **History** tab
2. Find your recent export
3. Click **Open in [Service Name]** to view your exported data
4. The file will open in a new browser tab

---

## Viewing Export History

The Export History keeps track of all your exports, making it easy to re-access past exports or review your export activity.

![Export History - Placeholder]

### What's Tracked

For each export, the history shows:

- **Template used** (e.g., Standard Export, Tax Report)
- **File format** (CSV, JSON, PDF, Excel)
- **Cloud service** (if exported to a cloud service)
- **Export date and time**
- **Number of records** exported
- **File size** (estimated)
- **Status** (Completed or Failed)
- **Download link** (if available)

### Accessing Export History

1. Open the Export Hub
2. Click on the **History** tab
3. Scroll through your export history

### Understanding History Items

Each history item displays:

```
┌─────────────────────────────────────────────────────┐
│ Standard Export  [CSV]  [Google Drive]              │
│ Jan 15, 2025 • 150 records • 22.5 KB                │
│ ✓ completed                                         │
│ → Open in Google Drive                              │
└─────────────────────────────────────────────────────┘
```

- **Top line**: Template name, format badge, service badge
- **Second line**: Date, record count, file size
- **Status badge**: Green (completed) or Red (failed)
- **Link**: Click to open the exported file

### Clearing History

To clear your export history:

1. Go to the **History** tab
2. Click the **Clear History** button in the top right
3. Your history will be cleared (this cannot be undone)

> **Note**: Clearing history only removes the records from your Export Hub. It does not delete files from cloud services.

### History Limits

- The Export Hub stores up to **50 most recent exports**
- Older exports are automatically removed when the limit is reached
- Files in cloud services remain accessible even after being removed from history

---

## Sharing Your Data

The Share tab provides two convenient ways to share your expense data with others.

![Share Tab Overview - Placeholder]

### Method 1: Email Export

Send an export directly to any email address.

#### Steps to Email an Export

1. Open the Export Hub
2. Click on the **Share** tab
3. Find the **Send via Email** section
4. Enter the recipient's email address
5. Click the **Send** button
6. Wait for confirmation (usually 1-2 seconds)
7. You'll see a success message when the email is sent

![Email Export - Placeholder]

#### What Gets Sent

The email includes:
- Your selected export template (from Templates tab)
- Your selected format
- Your current expense data as an attachment
- A friendly message with file details

#### Email Export Tips

- ✅ **Best practice**: Use this for sending reports to accountants or family members
- ⚠️ **Security note**: Email is not encrypted. Avoid sending sensitive data via email
- 💡 **Alternative**: For sensitive data, use shareable links with password protection (coming soon)

### Method 2: Shareable Links

Generate a secure link that anyone can access to view or download your expense data.

#### Creating a Shareable Link

![Generate Share Link - Placeholder]

1. Go to the **Share** tab
2. Find the **Shareable Link** section
3. Click **Generate Share Link**
4. Wait 2-3 seconds for generation
5. Your link and QR code will appear

#### Using the Shareable Link

Once generated, you'll see:

**Share Link**
```
https://expense-tracker.app/share/a3f9c2b1
```

**Features**:
- **Copy button**: Click to copy the link to your clipboard
- **QR code**: Share by scanning with a mobile device
- **Expiration notice**: Links expire in 7 days

![Shareable Link with QR Code - Placeholder]

#### Sharing the Link

You can share the link by:

1. **Copy-paste**: Click "Copy" and paste into messages, emails, or documents
2. **QR code**: Let others scan the QR code with their phone camera
3. **Direct access**: Click the link yourself to verify what others will see

#### Link Security

- 🔒 **Expiration**: Links automatically expire after 7 days
- 👁️ **View tracking**: The system tracks how many times the link is accessed
- 🚫 **One-time use**: (Coming soon) Option for links that expire after first access
- 🔐 **Password protection**: (Coming soon) Add password requirement for link access

#### QR Code Sharing

The QR code is perfect for:
- In-person sharing
- Presentations
- Printed materials
- Quick mobile access

**To use the QR code**:
1. Open your phone's camera app
2. Point at the QR code on screen
3. Tap the notification that appears
4. The link opens in your mobile browser

### Best Practices for Sharing

| Sharing Method | Best For | Security Level |
|----------------|----------|----------------|
| **Email** | Trusted recipients, accountants | Medium |
| **Share Link** | Temporary sharing, presentations | Medium |
| **QR Code** | In-person sharing, mobile users | Medium |
| **Cloud Service** | Team collaboration, long-term storage | High |

---

## Scheduled Exports

> **Note**: Scheduled exports is currently a planned feature and not yet available.

Scheduled exports will allow you to set up automatic, recurring exports to your favorite cloud services or email addresses.

### Planned Features

**Frequency Options**:
- Daily
- Weekly
- Monthly
- Custom (specific days)

**Delivery Options**:
- Send to email
- Save to cloud service
- Both

**Customization**:
- Choose template and format
- Set delivery time
- Select recipients
- Enable/disable schedules

### Coming Soon

Watch for updates! This feature will be added in a future release.

![Schedule Tab Placeholder - Placeholder]

---

## Tips & Best Practices

### Choosing the Right Export Format

**Use CSV when**:
- ✅ Importing into Excel or Google Sheets
- ✅ Working with databases
- ✅ Keeping file size small
- ✅ Maximum compatibility needed

**Use JSON when**:
- ✅ Integrating with software/APIs
- ✅ You're a developer
- ✅ You need structured data
- ✅ Preserving data types is important

**Use PDF when**:
- ✅ Printing reports
- ✅ Sharing read-only documents
- ✅ Creating professional-looking reports
- ✅ Archiving for records

**Use Excel when**:
- ✅ Advanced spreadsheet analysis needed
- ✅ Creating charts and graphs
- ✅ Using formulas and pivot tables
- ✅ Sharing with Microsoft Office users

### Export Workflow Examples

#### For Monthly Budgeting
1. Use the **Monthly Summary** template
2. Export as **Excel**
3. Save to **Google Sheets**
4. Share the Google Sheet with family members
5. Repeat monthly

#### For Tax Preparation
1. Use the **Tax Report** template
2. Export as **PDF**
3. Save to **Google Drive** in a "Tax Documents" folder
4. Email a copy to your accountant
5. Print a copy for your records

#### For Financial Analysis
1. Use the **Detailed Breakdown** template
2. Export as **Excel**
3. Download to your computer
4. Open in Excel/Google Sheets
5. Create custom pivot tables and charts

#### For Quick Sharing
1. Use the **Simple List** template
2. Export as **PDF**
3. Generate a shareable link
4. Share the link via text or email
5. Link expires automatically after 7 days

### Data Management Tips

**Regular Exports**
- 📅 Export monthly for backup purposes
- 💾 Save to at least one cloud service
- 📧 Keep a copy in your email for redundancy

**Organization**
- 🗂️ Create folders in your cloud storage by year/month
- 🏷️ Use consistent naming: "Expenses_2025-01_TaxReport.pdf"
- 📌 Keep tax-related exports in a separate folder

**Security**
- 🔒 Don't share links publicly
- ⏰ Use short expiration times for sensitive data
- 🔐 Delete old exports from cloud services regularly
- 👥 Only connect cloud services you trust

### Performance Tips

**Large Datasets**
- If you have many expenses (500+), use CSV or JSON formats
- Excel and PDF take longer to generate for large datasets
- Consider exporting smaller date ranges

**Slow Exports**
- Check your internet connection
- Try a different format
- Disconnect and reconnect the cloud service
- Clear your export history

---

## Troubleshooting

### Export Hub Button is Disabled

**Problem**: The "Export Hub" button is grayed out and won't click.

**Solution**:
- ✅ Add at least one expense to your tracker
- The Export Hub requires at least one expense to function

### Cloud Service Won't Connect

**Problem**: Clicking "Connect" doesn't work or shows an error.

**Solution**:
1. Check your internet connection
2. Refresh the page and try again
3. Try a different browser
4. Clear your browser cache
5. Make sure pop-ups are not blocked (some services use pop-up windows)

### Export Takes Too Long

**Problem**: Export seems stuck or takes more than 30 seconds.

**Solution**:
1. Check your internet connection
2. Try a different format (CSV is fastest)
3. Reduce the number of expenses (use filters first)
4. Close the Export Hub and try again
5. Refresh the browser page

### Can't Find My Exported File

**Problem**: Export succeeded but can't find the file.

**Solution**:
1. Check the **History** tab for the download link
2. Click "Open in [Service Name]" to access the file
3. Log into your cloud service directly and check your files
4. Check your email spam folder (for email exports)
5. Try exporting again

### QR Code Won't Generate

**Problem**: Share link created but no QR code appears.

**Solution**:
1. Wait a few more seconds (can take 3-5 seconds)
2. Refresh the page and try again
3. Try a different browser
4. Check browser console for errors
5. The link still works even without the QR code

### History Shows Wrong Information

**Problem**: Export history shows incorrect dates, sizes, or statuses.

**Solution**:
1. Refresh the page to reload history
2. Clear your export history and start fresh
3. The issue may be a display bug - the actual exports are likely correct
4. Check the cloud service directly to verify your files

### Export Failed Error

**Problem**: Export shows "Failed" status in history.

**Solution**:
1. Check your internet connection
2. Verify the cloud service is still connected
3. Try disconnecting and reconnecting the service
4. Try a different format or template
5. Try exporting fewer records
6. Contact support if the issue persists

### Share Link Doesn't Work

**Problem**: Generated share link shows an error when clicked.

**Solution**:
1. Check if the link has expired (7 days)
2. Generate a new share link
3. Try copying the link again (copy error)
4. Try accessing from a different device/browser
5. Check if you're online

---

## FAQ

### General Questions

**Q: How many exports can I create?**
A: Unlimited! You can create as many exports as you need. The Export Hub only stores the most recent 50 in your history.

**Q: Is my data safe?**
A: Your expense data is stored locally in your browser and only sent to cloud services when you explicitly export. Always use trusted cloud services and secure internet connections.

**Q: Can I undo an export?**
A: No, but you can delete files from your cloud services manually. Clearing export history doesn't delete cloud files.

**Q: What's the difference between Export Hub and the old "Export CSV" button?**
A: The old button only exported CSV files. Export Hub offers multiple formats, templates, cloud integrations, sharing options, and export history.

### Format Questions

**Q: Which format preserves formulas?**
A: None currently. Exports contain data only, not formulas. You'll need to add formulas manually in Excel/Sheets.

**Q: Can I export charts and graphs?**
A: Not currently. Templates like "Category Analysis" are designed for charts, but you'll need to create them in Excel/Sheets after exporting.

**Q: Does JSON include all expense fields?**
A: Yes, JSON includes all available fields, even those not shown in other formats.

**Q: Can I import these exports back into the expense tracker?**
A: Not currently. Exports are one-way. This feature may be added in the future.

### Cloud Integration Questions

**Q: Do I need to keep services connected?**
A: No, you can disconnect after exporting. You'll need to reconnect for future exports.

**Q: How do cloud services authenticate?**
A: Currently, authentication is simulated. In production, you would use OAuth to securely grant access.

**Q: Can I export to multiple services at once?**
A: No, you need to export to each service separately. However, you can do this quickly by selecting different services in the Integrations tab.

**Q: Where exactly do files get saved in my cloud storage?**
A: This depends on the service implementation. Typically, files go to the root folder or a default "Expense Tracker" folder.

### Sharing Questions

**Q: Can I password-protect share links?**
A: Not yet. This feature is planned for a future release.

**Q: How do I revoke a share link?**
A: Currently, links expire automatically after 7 days. Manual revocation will be added in the future.

**Q: Can recipients edit my data through share links?**
A: No, share links are read-only. Recipients can view and download, but not edit your data.

**Q: Do QR codes work offline?**
A: The QR code image works offline, but the link it contains requires internet to access.

### Technical Questions

**Q: What browsers are supported?**
A: All modern browsers (Chrome, Firefox, Safari, Edge). Internet Explorer is not supported.

**Q: Does this work on mobile?**
A: Yes! The Export Hub works on mobile browsers, though the interface is optimized for desktop.

**Q: Is an internet connection required?**
A: No for basic CSV export, yes for cloud integrations and email exports.

**Q: Where is my data stored?**
A: Expense data is stored in your browser's localStorage. Export history and integration settings are also stored locally.

### Troubleshooting Questions

**Q: Why is the Export Hub so slow?**
A: Large datasets (500+ expenses), slow internet, or generating complex formats like PDF can cause slowness. Try CSV for faster exports.

**Q: What happens if I close the browser during an export?**
A: The export may fail. Check your History tab or cloud service to see if it completed.

**Q: Can I recover deleted export history?**
A: No, clearing history is permanent. However, your files in cloud services remain unaffected.

**Q: What if I lose internet connection during export?**
A: The export will fail. You'll need to try again once you're back online.

---

## Need More Help?

If you have questions not covered in this guide:

1. **Check the Developer Documentation**: See [Developer Documentation](../dev/export-data.md) for technical details
2. **Report Issues**: File a bug report or feature request in the project repository
3. **Community Support**: Check community forums or discussion boards
4. **Contact Support**: Reach out to the development team directly

---

## Appendix: Keyboard Shortcuts

Currently, the Export Hub does not have keyboard shortcuts. This may be added in a future release.

**Planned Shortcuts**:
- `Ctrl/Cmd + E` - Open Export Hub
- `Esc` - Close Export Hub
- `Tab` - Navigate between tabs
- `Enter` - Confirm export/share actions

---

## Document Information

**Version**: 1.0
**Last Updated**: 2025-12-15
**Applies To**: Export Hub v3.0 (Cloud-Integrated)
**Related Documentation**: [Developer Documentation](../dev/export-data.md)

---

**Happy Exporting!** 🎉

We hope this guide helps you make the most of the Export Hub. If you have suggestions for improving this documentation, please let us know!
