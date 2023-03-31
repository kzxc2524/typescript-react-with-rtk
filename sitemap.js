const Sitemap = require("react-router-sitemap").default;
const routes = [
  { url: "/", changefreq: "daily", priority: 1 },
  { url: "/search", changefreq: "daily", priority: 1 },
];
function generateSitemap() {
  return (
    new Sitemap({
      hostname: "https://pumsupport.com",
      cacheTime: 600000,
      urls: routes,
    })
      .toString()
      .replace(/\/index/g, "") // remove "/index" from URLs
      .replace(/<url>/g, "<url><loc><![CDATA[") // wrap URLs in CDATA tags
      .replace(/<\/url>/g, "]]></loc></url>")
  );
}
const sitemap = generateSitemap();
console.log(sitemap);