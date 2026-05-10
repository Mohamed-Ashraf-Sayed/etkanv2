const INDEXNOW_KEY = "5cc004a87ef14ad28093c691f79fd385";
const HOST = "etqanly.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export async function pingIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0) return;

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`IndexNow ${res.status}: ${body.slice(0, 200)}`);
  }

  console.log(`IndexNow: pinged ${urls.length} URL(s)`);
}
