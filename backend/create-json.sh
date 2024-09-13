# export VOL_PATH="/default/path/to/add/as/env/dockerfile"
path_to_tvshows_json="../tv-shows-json-create.sh"
path_to_movies_json="../movies-json-create.sh"
$path_to_tvshows_json > data/tvshows.json
$path_to_movies_json > data/movies.json


echo " " >> "src/app.ts"
