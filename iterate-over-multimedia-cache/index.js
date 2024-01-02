
import fetch from 'node-fetch';

const { NEXT_PUBLIC_STRAPI_API_TOKEN, STRAPI_API_URL } = process.env;
const limit = 10;

async function fetchData(url) {
  const response = await fetch(url, {
    headers: {
      'accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`
    }
  });
  return response.json();
}

async function processThumbnail(thumbnailUrl) {
  const thumbnailWithToken = `${STRAPI_API_URL}${thumbnailUrl}`;
  console.log(`Processing Thumbnail: ${thumbnailWithToken}`);
}

async function main() {
  let nextUrl = `${STRAPI_API_URL}/api/v1/multimedia?limit=${limit}&start=0`;

  do {
    const data = await fetchData(nextUrl);
    const entries = data.data;

    for (const entry of entries) {
      const thumbnailUrl = entry.attributes['ThumbnailUrl'];
      await processThumbnail(thumbnailUrl);
      await processThumbnail(entry.attributes['FileUrl']);
    }

    nextUrl = data.links.next;
  } while (nextUrl);
}

main().catch(error => console.error(error));
