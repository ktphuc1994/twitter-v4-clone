export default async function handler(req, res) {
  let revalidated = false;

  const { toPath } = req.query;
  if (!toPath) {
    res.json({ revalidated });
    return;
  }

  try {
    await res.revalidate(toPath);
    revalidated = true;
  } catch (error) {}

  res.json({ revalidated });
}
