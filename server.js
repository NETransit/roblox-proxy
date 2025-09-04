import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const app = express();
const PORT = 3000;

app.get("/roblox-stats/:universeId", async (req, res) => {
  const universeId = req.params.universeId;
  
  try {
    const [gameRes, voteRes] = await Promise.all([
      
fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`),
      
fetch(`https://games.roblox.com/v1/games/votes?universeIds=${universeId}`)
    ]);

    const game = await gameRes.json();
    const votes = await voteRes.json();

    res.json({ game, votes });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

