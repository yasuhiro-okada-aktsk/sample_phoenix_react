export MIX_ENV=prod

# Initial setup
npm install
mix clean
gulp clean
mix deps.get --only prod
mix compile

# Compile assets
gulp build
mix phoenix.digest

mix release