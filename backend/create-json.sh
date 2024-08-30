export VOL_PATH="/mnt/DATA"
path_to_tvshows_json="$VOL_PATH""/tv-shows-json-create.sh"
$path_to_tvshows_json > data/tvshows.json
echo " " >> "src/app.ts"
