set -a
. /data/zacheta/scrips/../strapi/.env
wget -O - https://raw.githubusercontent.com/yyx990805/strapi-utils/master/iterate-over-multimedia-cache/index.js | node
