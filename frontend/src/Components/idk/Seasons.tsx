import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Seasons = ({ TvShow }: any) => {
  const navigate = useNavigate();
  const IP_ADDR = process.env.REACT_APP_IP_ADDR
  const [TvShowImage, SetTvShowImage] = useState<string>("");
  const [ShowSeasonsData, SetShowSeasonsData] = useState<string[]>()
  const getData = async () => {
    let response = await (
      await fetch(`http://${IP_ADDR}:7000/api/${TvShow}/seasons`)
    ).text();
    let data = JSON.parse(response);
    let TempDataArr: string[] = [];
    for (let index = 0; index < Object.keys(data).length; index++) {
      if (Object.keys(data)[index] != "show-img") {
        TempDataArr.push(Object.keys(data)[index]);

      }
    }
    TempDataArr.sort((a, b) => {
      if (parseInt(b.replaceAll("season", "")) < parseInt(a.replaceAll("season", ""))) return 1;
      if (parseInt(b.replaceAll("season", "")) > parseInt(a.replaceAll("season", ""))) return -11;
      return 0
    })
    SetTvShowImage(data["show-img"]);
    SetShowSeasonsData(TempDataArr);
    console.log(Object.keys(data))

  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container spacing={0} rowSpacing={0} columnSpacing={0}>

      {ShowSeasonsData?.map((item, index) => {
        console.log(TvShow)
        return (
          <Grid item xs={12} key={index} style={{}} >
            <div tabIndex={0} style={{ cursor: "pointer" }} onClick={() => navigate('/episodes', { state: { c_Tvshow: TvShow, c_season: item } })}>

              <p key={index + 2} style={{ cursor: "pointer" }}>{item}</p>
              <img
                key={index + 3}
                src={TvShowImage}
                style={{ width: " 25%", height: "100%", cursor: "pointer" }}
              />
            </div>
          </Grid>
        );
      })}
    </Grid>
  )
}

export default Seasons