// queryContent is a composable that only works in setup script
import { serverQueryContent } from "#content/server";
// static API endpoint for stories fetching
export default defineEventHandler(async (event) => {
  return await serverQueryContent(event).without("body").find();
});
