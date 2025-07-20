# Batch Add LeetCode Problems to Playlist/Favorites

This script automates adding multiple LeetCode problems to your favorites or a custom playlist using LeetCode's GraphQL API. It runs in the browser console leveraging your logged-in session.

---

## Features

- Adds problems one by one from a provided list.
- Converts problem names to LeetCode URL slugs automatically.
- Skips problems already added to the playlist.
- Logs progress and errors in the console.
- Uses your browser cookies and CSRF token for authentication.

---

## Prerequisites

- Logged in to [LeetCode](https://leetcode.com) in your browser.
- Basic knowledge of using browser Developer Tools → Console.
- Your **playlist or favorites slug** (a unique identifier string).

---

## How to Find Your Playlist Slug

1. Navigate to your LeetCode playlist or favorites page.
2. Look at the URL, e.g.  
   `https://leetcode.com/playlists/nk2502kd/` or  
   `https://leetcode.com/favorites/nk2502kd/`
3. The last part (e.g., `nk2502kd`) is your playlist slug.

---

## Usage

1. Open [leetcode.com](https://leetcode.com) and ensure you are logged in.
2. Open Developer Tools in your browser (Right-click → Inspect → Console).
3. Copy the entire script from the **Script section** below.
4. Paste the script into the console.
5. Modify the `favoriteSlug` variable inside the script to your playlist slug.
6. Press Enter to run.
7. Watch the console for progress logs and any errors.

