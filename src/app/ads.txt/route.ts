import { ADSENSE_CLIENT } from "@/constants";

// Served at /ads.txt — required by AdSense to authorise this site's ad inventory.
export function GET() {
  const publisher = ADSENSE_CLIENT.replace(/^ca-/, "");
  const body = publisher ? `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n` : "";
  return new Response(body, {
    status: publisher ? 200 : 404,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
