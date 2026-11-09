# Koveli Announcement

Airport announcement console: boarding, passenger paging, delay, gate change, cancellation and custom announcements in English, Arabic, Cantonese, Mandarin, Russian, Italian and Japanese, with flight presets and YouTube background music.

## Install on a computer

1. Put **`Ding.mp3`** (your chime sound) in this folder next to `index.html` and push it. Without it the console uses a built-in two-tone chime.
2. Turn on GitHub Pages: repository **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
3. After a minute the console is live at `https://<your-username>.github.io/<repository-name>/`.
4. Open that address in **Microsoft Edge** or **Google Chrome** on the announcement computer.
5. Click **⬇ Install app** at the top of the console (or the install icon in the address bar). It now opens from the Start menu / desktop in its own window, like a normal program.

Updates: push changes to GitHub, then close and reopen the app. It picks up the new version automatically.

## Voices

Announcements use the voices installed on the computer. On Windows, Edge provides the best natural voices (for example *Microsoft Sonia Online* for English, *Zariyah* for Arabic). Install extra languages in **Windows Settings → Time & language → Speech**.

## Background music

- Music is chosen for the time of day (morning, afternoon, evening) and is kept at **15%** volume.
- The music **pauses** when an announcement starts and **plays again** when the announcement finishes or is stopped.
- Music needs an internet connection. Announcements keep working offline once the app has been opened online at least once.

The YouTube Data API key in `index.html` is visible to anyone who opens the page. In Google Cloud Console, restrict it to your GitHub Pages address (HTTP referrer `https://<your-username>.github.io/*`) and to the YouTube Data API v3 only.

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| Ctrl + Enter | Play the announcement on screen |
| Alt + 1 … 8 | Play preset 1–8 (or save the current announcement to an empty preset) |
| Enter | Confirm in the preset confirmation window |
| Esc | Stop the announcement |

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The console |
| `manifest.webmanifest` | App name and icons used when installing |
| `sw.js` | Lets the installed app open offline and update itself |
| `icons/` | App icons |
| `Ding.mp3` | Chime sound (add your own) |
