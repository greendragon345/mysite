#!/bin/bash

#┌────────────────────┐
#│    json format     │
#└────────────────────┘
 #{ 
   #"tvshows": { 
     #"hazbin.hotel": {
     #"show-img":"https://image.tmdb.org/t/p/original/the path 
       #"season1": { 
         #"ep1": { 
           #"name": "idk", 
           #"description": "idksomething",
	   #rating:9, 
           #"path": "path/to/ep/1"
	   #episode-img:"https://image.tmdb.org/t/p/original/the path
	   #subtitles-path: none
         #}, 
         #"ep2": { 
           #"name": "idk", 
           #"description": "idksomething", 
           #"path": "path/to/ep/2"
	   #subtitles-path: 
         #} 
       #} 
     #} 
   #} 
 #}
id_api_token="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWQwNTEzODFhMzIxY2RmMzEyOTE3YWI1YTA1NmExZiIsIm5iZiI6MTcyNDU2MzM1OS45NjQ4NSwic3ViIjoiNjZjYWI2MTkyN2Y2MTI5MDc0NWYwMDFhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.n3ji4BXnjbfsSFtzTi26-v-6PlVM-xvrHknugDxDkUg"
path_to_mp4_convertor="$VOL_PATH""/convert-to-mp4.sh" 
path_to_tvshows="$VOL_PATH""/Tv-shows"
shows_subtitles=$(find "$VOL_PATH""/Tv-shows" -name "*.srt" -type f -exec readlink -f '{}' \;)
previd=""
tvshows=""
tvshows_seasons=""
#echo "no" | "$path_to_mp4_convertor"
shows=$(find "$path_to_tvshows" -name "*.mp4" -type f -exec readlink -f '{}' \;)
while IFS= read -r line; 
do
	tvshows="$tvshows""$(echo "$line" | awk -F "/" '{print $(NF-2)}' | tr '[:lower:]' '[:upper:]')\n"
	tvshows_seasons="$tvshows_seasons"$(echo "$line" | awk -F "/" '{print $(NF-2)}' | tr '[:lower:]' '[:upper:]')"/~.~/"$(echo "$line" | grep -o -i "\.S[[:digit:]]*E[[:digit:]]*\." | tr -d '.Ss' | sed 's/E/\./I' | awk -F "." '{print $1}')"\n"

done < <(printf '%s' "$shows")
tvshows=$(echo -e "$tvshows" |uniq -i| sed ':a;N;$!ba;s/\n/ /g')
tvshows_seasons=$(echo -e "$tvshows_seasons" |uniq -i | sed ':a;N;$!ba;s/\n/ /g')


JSON=$(jq -n '.')
for word in $tvshows
do	
	c_tvshows_season=$(echo "$tvshows_seasons" |grep -iow "$word/~\.~/[[:digit:]]*[[:space:]]")
	ssnjson=$(jq -nc '.')
	c_show_id=$(curl --silent --request GET \
                            --url 'https://api.themoviedb.org/3/search/tv?query='$(echo "$word" | sed 's/\./''\''%20/g')'&include_adult=false&language=en-US&page=1'\
                            --header 'Authorization: Bearer '"$id_api_token"\
                            --header 'accept: application/json' | jq .results[0].id)


        api_data=$(curl --silent --request GET \
                          --url 'https://api.themoviedb.org/3/tv/'"$c_show_id" \
                          --header 'Authorization: Bearer '"$id_api_token"\
                          --header 'accept: application/json')

	show_img="https://image.tmdb.org/t/p/original"$(echo "$api_data" | jq '.backdrop_path'| tr -d '"')
 	 
	for word2 in $c_tvshows_season
       	do	
                ssnjson=$(echo $ssnjson |jq -c --argjson episodes '{}' '. += {'"season"$(echo "$word2"| awk -F "/~.~/" '{print $NF}')': $ARGS.named}')
	done
	JSON=$(echo $JSON | jq --argjson "$word" $ssnjson '. += $ARGS.named')
	JSON=$(echo $JSON | jq '.'"\"""$word""\""'+= {'"\"""show-img""\""':'"\"""$show_img""\""'}')
done
while IFS= read -r line; 
do
	c_tvshow=$(echo "$line" | awk -F "/" '{print $(NF-2)}' | tr '[:lower:]' '[:upper:]')
	c_tvshow_season=$(echo "$line" | grep -o -i "\.S[[:digit:]]*E[[:digit:]]*\." | tr -d '.Ss' | sed 's/E/\./I' | awk -F "." '{print $1}')
	c_tvshow_episode=$(echo "$line" | grep -o -i "\.S[[:digit:]]*E[[:digit:]]*\." | tr -d '.Ss' | sed 's/E/\./I' | awk -F "." '{print $2}')
	c_show_id=$(curl --silent --request GET \
                            --url 'https://api.themoviedb.org/3/search/tv?query='$(echo "$c_tvshow"|sed 's/season//g' | sed 's/\./''\''%20/g')'&include_adult=false&language=en-US&page=1'\
                            --header 'Authorization: Bearer '"$id_api_token"\
                            --header 'accept: application/json'| jq '.results[0].id')
	api_data=$(curl --silent --request GET \
     		          --url 'https://api.themoviedb.org/3/tv/'"$c_show_id"'/season/'"$c_tvshow_season"'/episode/'"$c_tvshow_episode" \
     			  --header 'Authorization: Bearer '"$id_api_token"\
     			  --header 'accept: application/json')
	api_name=$(echo "$api_data" | jq '.name')
	api_description=$(echo "$api_data" | jq '.overview')
	api_rating=$(echo "$api_data" | jq '.vote_average')
	video_path=$(echo "$line")
	subtitles_path=$(echo "$line" | sed 's/.mp4/.srt/1')
	subtitles_path=$(echo -e "$shows_subtitles"|grep "$subtitles_path")
	if [ -z "$subtitles_path" ];
	then
		subtitles_path="none"
	else
	  subtitles_path=$(echo -e "$subtitles_path")

	fi
	ep_img="https://image.tmdb.org/t/p/original"$(echo "$api_data" | jq '.still_path'| tr -d '"')
	c_ep_json=$(jq -nc '.')
	c_ep_json=$(echo $c_ep_json |jq -c --arg name "${api_name}" '. += $ARGS.named')
	c_ep_json=$(echo $c_ep_json | jq -c --arg description "${api_description}" '. += $ARGS.named')
	c_ep_json=$(echo $c_ep_json | jq -c --arg rating "${api_rating}" '. += $ARGS.named')
	c_ep_json=$(echo $c_ep_json | jq -c --arg path "${video_path}" '. += $ARGS.named')
	c_ep_json=$(echo $c_ep_json | jq -c --arg episode-img "${ep_img}" '. += $ARGS.named')
        c_ep_json=$(echo $c_ep_json | jq -c --arg subtitles-path "${subtitles_path}" '. += $ARGS.named')
	#"show-img"

	JSON=$(echo $JSON | jq '.'"\"""$c_tvshow""\""'.'"season""$c_tvshow_season"'.episodes += {'"\"""ep""$c_tvshow_episode""\""':'"$c_ep_json"'}')


done < <(printf '%s' "$shows")

echo "$JSON"






