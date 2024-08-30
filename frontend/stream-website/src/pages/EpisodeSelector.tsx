import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Episodes from "../Components/idk/Episodes";
import { Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EpisodeSelector = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { c_Tvshow, c_season } = state;
  console.log(c_Tvshow);
  console.log(c_season);

  return (
    <Grid spacing={1}>
      <Grid item xs={12} style={{}}>
        <div>
          <IconButton
            onClick={() =>
              navigate("/seasons", { state: { Tvshow: c_Tvshow } })
            }
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
      </Grid>{" "}
      <div>
        <Grid item xs={12} style={{}}>
          <Episodes TvShow={c_Tvshow} season={c_season} />
        </Grid>
      </div>
    </Grid>
  );
};

export default EpisodeSelector;
