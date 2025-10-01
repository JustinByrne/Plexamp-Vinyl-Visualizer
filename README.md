

# Plexamp Vinyl Visualizer

A tiny Node.js server + HTML frontend that turns your Plexamp playback into a **spinning vinyl record**.  
The record shows the current album artwork and spins only while music is playing. Pause = stop. 🎶💿

---

##  Features

- Live album cover from Plexamp
- Spinning vinyl effect
- Play/pause synced with Plexamp
- Works in any modern browser (incl. projector web browsers, Apple TV via AirPlay, etc.)

---

##  Installation

1. **Clone this repository**

```bash
git clone https://github.com/tbollinger63/Plexamp-Vinyl-Visualizer.git
cd Plexamp-Vinyl-Visualizer
```

2.	Install dependencies

```bash
npm install
```


3.	Edit server.js and add your Plex token
Replace this line:

```
const PLEX_URL = 'http://<YOUR_SERVER_IP>:32400/status/sessions?X-Plex-Token=<YOUR-TOKEN>';
```

with your real server IP and token.

---

## How to get your Plex token

There are two simple methods:

### Method A

Read it from `Preferences.xml` (Linux Plex Server)

Run:

```bash
sudo cat "/var/lib/plexmediaserver/Library/Application Support/Plex Media Server/Preferences.xml" | grep -i PlexOnlineToken
```

You’ll see something like:

```
PlexOnlineToken="GMGsBCzK1Pa3u2gvzo2H"
```

Copy the value between the quotes.

---

### Method B

Use the browser developer tools
	
1.	Open Plex Web App (e.g. http://<your-server-ip>:32400/web)
2.	Start playback in Plexamp
3.	Press F12 → go to Network tab
4.	Look for a request to /status/sessions
5.	The URL contains X-Plex-Token=... → copy that value

---

## Usage

Start the server:

```bash
npm start
```

- Server status JSON: http://localhost:3000/status
- Vinyl visualizer: http://localhost:3000/index.html

Open the visualizer full screen and enjoy your spinning record. Perfect for mini projectors above your turntable.

---

## Notes

- Never commit or share your real Plex token publicly.
- Tested with Node.js 20+.
- Contributions welcome!


