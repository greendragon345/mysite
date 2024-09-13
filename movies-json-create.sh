#!/bin/bash
#┌────────────────────┐
#│    json format     │
#└────────────────────┘
 #{
   #"tvshows": {
     #"hazbin.hotel": {
           #"name": "idk",
           #"description": "idksomething",
           #rating:9,
           #"path": "path/to/ep/1"
           #episode-img:"https://image.tmdb.org/t/p/original/the path
           #subtitles-path: none
       #}
     #}
   #}
id_api_token="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWQwNTEzODFhMzIxY2RmMzEyOTE3YWI1YTA1NmExZiIsIm5iZiI6MTcyNDU2MzM1OS45NjQ4NSwic3ViIjoiNjZjYWI2MTkyN2Y2MTI5MDc0NWYwMDFhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.n3ji4BXnjbfsSFtzTi26-v-6PlVM-xvrHknugDxDkUg"
path_to_mp4_convertor="$VOL_PATH""/convert-to-mp4.sh"
path_to_movies="$VOL_PATH""/Movies"
shows_subtitles=$(find "$VOL_PATH""/Tv-shows" -name "*.srt" -type f -exec readlink -f '{}' \;)
shows=$(find "$path_to_movies" -name "*.mp4" -type f -exec readlink -f '{}' \;)
movies_names=""
movies_path=""
JSON=$(jq -n '.')
while IFS= read -r line;
do
        movies_names="$(echo "$line" | awk -F "/" '{print $(NF-1)}' | awk -F "~" '{ print $1}'| tr '[:lower:]' '[:upper:]')"
	movie_paths="$line"
	c_movie_id=$(curl --silent --request GET \
                    --url 'https://api.themoviedb.org/3/search/movie?query='$(echo "$movies_names"|sed 's/\./''\''%20/g')'&include_adult=false&language=en-US&page=1'\
                    --header 'Authorization: Bearer '"$id_api_token"\
                    --header 'accept: application/json'| jq '.results[0].id')
	api_data=$(curl --silent --request GET \
                  --url 'https://api.themoviedb.org/3/movie/'"$c_movie_id" \
                  --header 'Authorization: Bearer '"$id_api_token"\
                  --header 'accept: application/json')
        api_name=$(echo "$api_data" | jq '.title'|tr -d '"')
        api_description=$(echo "$api_data" | jq '.overview'|tr -d '"')
        api_rating=$(echo "$api_data" | jq '.vote_average'|tr -d '"')
        video_path=$(echo "$line"|tr -d '"')
        subtitles_path=$(echo "$line" | sed 's/.mp4/.srt/1'|tr -d '"')
        subtitles_path=$(echo -e "$shows_subtitles"|grep "$subtitles_path"|tr -d '"')
        if [ -z "$subtitles_path" ];
        then
                subtitles_path="none"
        else
          subtitles_path=$(echo -e "$subtitles_path")

        fi
        ep_img="https://image.tmdb.org/t/p/original"$(echo "$api_data" | jq '.backdrop_path'| tr -d '"')
        c_ep_json=$(jq -nc '.')
        c_ep_json=$(echo $c_ep_json |jq -c --arg name "${api_name}" '. += $ARGS.named')
        c_ep_json=$(echo $c_ep_json | jq -c --arg description "${api_description}" '. += $ARGS.named')
        c_ep_json=$(echo $c_ep_json | jq -c --arg rating "${api_rating}" '. += $ARGS.named')
        c_ep_json=$(echo $c_ep_json | jq -c --arg path "$video_path" '. += $ARGS.named')
        c_ep_json=$(echo $c_ep_json | jq -c --arg movie-img "${ep_img}" '. += $ARGS.named')
        c_ep_json=$(echo $c_ep_json | jq -c --arg subtitles-path "${subtitles_path}" '. += $ARGS.named')	
	JSON=$(echo $JSON | jq --argjson "${movies_names}" "${c_ep_json}" '.+= $ARGS.named')

done < <(printf '%s' "$shows")
echo "$JSON" 


