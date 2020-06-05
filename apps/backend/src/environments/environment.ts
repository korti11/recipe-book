export const environment = {
  production: false,
  port: process.env.PORT || 8081,
  recipe_host: process.env.RECIPE_HOST || "localhost",
  recipe_port: parseInt(process.env.RECIPE_PORT, 10) || 8080
};
