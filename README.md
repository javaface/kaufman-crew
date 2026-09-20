# Kaufman Golf Group Site

A Jekyll-based GitHub Pages site for the Kaufman Golf Group — Wyoming, MI.

Tracks course announcements and tee times / pairings for rounds at Kaufman Golf Course. Scores are tracked separately via [GHIN](https://www.ghin.com).

## Pages

| Page | URL | Purpose |
|------|-----|---------|
| Announcements | `/` | Course closures, conditions, events |
| Tee Times | `/teetimes` | Upcoming rounds and pairings |
| About | `/about` | Data format reference |

## Adding an Announcement

Edit `_data/announcements.yml` and add a new entry at the top:

```yaml
- title: "Cart Path Only"
  date: "2026-10-01"
  type: "Cart Path Only"           # Closure | Cart Path Only | Aerification | Weather | Event | General
  body: "Fairways still soft after Tuesday's rain. All carts on the path."
  expires: "2026-10-05"            # optional — card hides after this date
  source: ""                       # optional URL
```

## Adding a Tee Time

Edit `_data/teetimes.yml`:

```yaml
- date: "2026-10-18"
  time: "08:30"        # 24-hour
  holes: 18
  notes: "Bring cash for skins."
  pairings:
    - players: ["Matt", "Dave", "Chris", "Tony"]
    - players: ["Mike", "Jake", "Ryan"]
```

## Local Development

Requires Ruby (via [rvm](https://rvm.io)) and Bundler.

```bash
# First-time setup (only needed once)
sudo xcodebuild -license accept
bundle config set build.eventmachine '--with-ssl-dir=/opt/homebrew/opt/openssl@1.1'
bundle install

# Start local server
bundle exec jekyll serve --port 4000
# → http://127.0.0.1:4000
```


## File Structure

```
GolfSite/
├── _config.yml               # Site title, description
├── _layouts/default.html     # Shared HTML layout and nav
├── _data/
│   ├── announcements.yml     # Course status updates
│   └── teetimes.yml          # Rounds and pairings
├── index.html                # Announcements feed
├── teetimes.html             # Tee times page
├── about.html                # Data format reference
└── assets/
    ├── css/style.css
    └── js/main.js
```
