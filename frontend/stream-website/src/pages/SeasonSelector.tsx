import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, IconButton } from "@mui/material";
import Seasons from "../Components/idk/Seasons";

const SeasonSelector = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { Tvshow } = state;
  console.log(Tvshow);
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
          <Seasons TvShow={Tvshow} />
        </Grid>
      </div>
    </Grid>
  );
};

export default SeasonSelector;
