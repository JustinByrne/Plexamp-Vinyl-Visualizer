const express = require('express');
const xml2js = require('xml2js');
// fetch ist in Node 20 nativ verfügbar, keine extra require nötig!
const app = express();
const PORT = 3000;

// Plex Server + Token
const PLEX_URL = 'http://<YOUR_PLEX_SERVER_IP>:32400/status/sessions?X-Plex-Token=<YOUR-TOKEN>';

// Test-Endpoint
app.get('/ping', (req, res) => {
  res.json({ msg: 'Server läuft!' });
});

// Plex-Status
app.get('/status', async (req, res) => {
  try {
    const response = await fetch(PLEX_URL);
    const xml = await response.text();

    // XML in JSON umwandeln
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'XML parse error' });
      }

      const tracks = result.MediaContainer.Track || [];
      if (tracks.length > 0) {
        const track = tracks[0];
        const player = track.Player?.[0]?.$ || {};
        const state = player.state || 'stopped';
        const thumb = track.$.thumb;

        let coverUrl = null;
        if (thumb) {
          coverUrl = `http://192.168.1.111:32400${thumb}?X-Plex-Token=GMGsBCzK1Pa3u2gvzo2H`;
        }

        res.json({
          state,
          cover: coverUrl
        });
      } else {
        res.json({ state: 'stopped' });
      }
    });
  } catch (e) {
    console.error('Fehler beim Abruf von Plex:', e);
    res.status(500).json({ error: 'Fetch failed' });
  }
});

// Static files für dein Vinyl-Frontend
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
