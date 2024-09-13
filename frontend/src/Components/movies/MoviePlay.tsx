import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "../Player/Player";
import { set } from "date-fns";
import ReactPlayer from "react-player";

interface EpisodeData {
    name: string;
    description: string;
    rating: string;
    video_path: string;
    movie_img: string;
}

const MoviePlay = (MovieName: any) => {
    const count = useRef(0);
    const IP_ADDR = process.env.REACT_APP_IP_ADDR
    const navigate = useNavigate();
    const [MovieData, setMovieData] = useState<EpisodeData>(
        {
            name: "none",
            description: "none",
            rating: "none",
            video_path: "none",
            movie_img: "none",
        },
    );

    const getData = async () => {
        let response = await (
            await fetch(`http://${IP_ADDR}:7000/api/movies`)
        ).text();
        let data = JSON.parse(response);
        console.log(data[MovieName["MovieName"]])
        console.log(MovieName["MovieName"])
        const TempData = {
            name: data[MovieName["MovieName"]]["name"],
            description: data[MovieName["MovieName"]]["description"],
            rating: data[MovieName["MovieName"]]["rating"],
            video_path: `http://${IP_ADDR}:7000/watch/movies/` + MovieName["MovieName"],
            movie_img: data[MovieName["MovieName"]]["movie-img"]
        }
        setMovieData(TempData);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Grid container spacing={0} rowSpacing={0} columnSpacing={0}>

            <Grid item xs={12} style={{}}>
                <Player
                    url={MovieData.video_path}
                    light={MovieData.movie_img}
                    ep_name={MovieData.name.replaceAll('"', "")}
                    rating={MovieData.rating}
                    description={MovieData.description.replaceAll('"', "")}
                />
            </Grid>
        </Grid>
    );
};

export default MoviePlay;
