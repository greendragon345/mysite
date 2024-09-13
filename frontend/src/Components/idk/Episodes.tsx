import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "../Player/Player";
import { set } from "date-fns";
import ReactPlayer from "react-player";
type EpisodesPrompts = {
  TvShow: string;
  season: string;
};
interface EpisodeData {
  name: string;
  description: string;
  rating: string;
  video_path: string;
  episode_img: string;
  episode_number: number
}
const IP_ADDR = process.env.REACT_APP_IP_ADDR
const Episodes = ({ TvShow, season }: EpisodesPrompts) => {
  const count = useRef(0);

  const navigate = useNavigate();
  console.log(TvShow);
  const [ShowDataArr, setShowDataArr] = useState<EpisodeData[]>([
    {
      name: "none",
      description: "none",
      rating: "none",
      video_path: "none",
      episode_img: "none",
      episode_number: 0
    },
  ]);

  const getData = async () => {
    let response = await (
      await fetch(`http://${IP_ADDR}:7000/api/tvshows`)
    ).text();
    let data = JSON.parse(response);
    let TempDataArr: EpisodeData[] = [];
    console.log(TvShow);
    console.log(season);
    console.log(data);
    Object.keys(data[TvShow][season]["episodes"]).map(
      (val: string, index: number) => {
        let ep = data[TvShow][season]["episodes"][val];
        TempDataArr.push({
          name: ep["name"],
          description: ep["description"],
          rating: ep["rating"],
          video_path:
            `http://${IP_ADDR}:7000/watch/` + TvShow + "/" + season + "/" + val,
          episode_img: ep["episode-img"],
          episode_number: parseInt(val.replaceAll("ep", ""))
        });
      }
    );
    console.log(TempDataArr);
    TempDataArr.sort((a, b) => {
      if (b.episode_number < a.episode_number) return 1;
      if (b.episode_number > a.episode_number) return -1;
      return 0
    })
    setShowDataArr(TempDataArr);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container spacing={0} rowSpacing={0} columnSpacing={0}>
      {ShowDataArr?.map((item, index) => {
        return (
          <Grid item xs={12} key={index} style={{}}>
            <p key={index}>
              {season} episode{index + 1}
            </p>
            <Player
              key={index + 1}
              url={item.video_path}
              light={item.episode_img}
              ep_name={item.name.replaceAll('"', "")}
              rating={item.rating}
              description={item.description.replaceAll('"', "")}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Episodes;
