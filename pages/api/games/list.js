export default async function handler(req, res) {
  // games are static files under /public/games
  const games = [
    { id:"g1", name:"Puzzle Master", thumbnail:"/games/sample-game/thumbnail.png", url:"/games/sample-game/index.html" }
  ];
  res.json({ success:true, games });
}
