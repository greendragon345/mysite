import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, IconButton } from "@mui/material";
import Seasons from "../Components/idk/Seasons";
import MoviePlay from "../Components/movies/MoviePlay";

const MoviesPlayer = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { Movie } = state;
    console.log(Movie);
    return (
        <Grid spacing={1}>
            <Grid item xs={12} style={{}}>
                <div>
                    <IconButton onClick={() => navigate("/")}>
                        <ArrowBackIcon />
                    </IconButton>
                </div>
            </Grid>{" "}
            <div>
                <Grid item xs={12} style={{}}>
                    <MoviePlay MovieName={Movie} />
                </Grid>
            </div>
        </Grid>
    );
};

export default MoviesPlayer;