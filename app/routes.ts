import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("article/:paper_id", "routes/article.tsx"),
  route("articleList", "routes/articleList.tsx"),
] satisfies RouteConfig;
