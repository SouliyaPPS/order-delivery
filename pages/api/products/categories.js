import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const categories = ["RE-CRAFT STAR", "SPECIAL COLLECTION", "FABRIC SCRAP"];
  res.send(categories);
});

export default handler;
