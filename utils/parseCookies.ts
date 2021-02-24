import cookie from "cookie";
import { IncomingMessage } from "http";

export default function parseCookies(req: IncomingMessage) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}
