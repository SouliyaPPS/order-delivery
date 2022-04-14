import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const categories = ["STAR COLLECTION", "MOON COLLECTIONS", "FABRIC SCRAP"];
  res.send(categories);
});

export default handler;
