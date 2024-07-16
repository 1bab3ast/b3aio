import AvatarHtml from "./_avatarHtml.js";

const ONE_DAY = 60*60*24;
const ONE_WEEK = ONE_DAY*7;

const IMAGE_WIDTH = 60;
const IMAGE_HEIGHT = 60;
const IMAGE_TTL = 1 * 7 * 24 * 60 * 60; // 1 week in seconds
const FALLBACK_IMAGE_FORMAT = "png";

export async function GET(request, context) {
  // e.g. /https%3A%2F%2Fwww.11ty.dev%2F/
  let requestUrl = new URL(request.url);
  let [url] = requestUrl.pathname.split("/").filter(entry => !!entry);

  if(!url || url?.endsWith("favicon.ico")) {
    return new Response("{}", {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": `public, s-maxage=${ONE_WEEK}, stale-while-revalidate=${ONE_DAY}`
      }
    });
  }

  url = decodeURIComponent(url);

  try {
    // output to Function logs
    console.log("Fetching", url);

    let avatar = new AvatarHtml(url);
    await avatar.fetch();

    let stats = await avatar.getAvatar(IMAGE_WIDTH, FALLBACK_IMAGE_FORMAT);
    let format = Object.keys(stats).pop();
    let stat = stats[format][0];

    return new Response(stat.buffer, {
      headers: {
        "content-type": stat.sourceType,
        "cache-control": `public, s-maxage=${ONE_WEEK}, stale-while-revalidate=${ONE_DAY}`
      }
    });
  } catch (error) {
    console.log("Error", error);

    // We need to return 200 here or Firefox won’t display the image
    // empty svg
    return new Response(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${IMAGE_WIDTH}" height="${IMAGE_HEIGHT}" aria-hidden="true" focusable="false"></svg>`, {
      headers: {
        "content-type": "image/svg+xml",
        "x-11ty-error-message": error.message,
        "cache-control": `public, s-maxage=${ONE_WEEK}, stale-while-revalidate=${ONE_DAY}`,
      }
    });
  }
}

