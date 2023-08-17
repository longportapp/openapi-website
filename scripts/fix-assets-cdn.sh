# Iter all files in dist, replace `(\/zh-CN|\/zh-HK|\/en)/assets` into `https://static.lbkrs.com/openapi-website/$1/assets`
# If macOS
if [ "$(uname)" == "Darwin" ]; then
  find ./dist -type f -name "*.html" -exec sed -i '' -E 's/(\/zh-CN|\/zh-HK|\/en)?\/assets\//https:\/\/static.lbkrs.com\/openapi-website\1\/assets\//g' {} +
else
  find ./dist -type f -name "*.html" -exec sed -i -E 's/(\/zh-CN|\/zh-HK|\/en)?\/assets\//https:\/\/static.lbkrs.com\/openapi-website\1\/assets\//g' {} +
fi