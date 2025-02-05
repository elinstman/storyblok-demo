import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "./routes/$slug.tsx" ),
  route("/*", "./routes/catchAll.tsx"),
] satisfies RouteConfig;
