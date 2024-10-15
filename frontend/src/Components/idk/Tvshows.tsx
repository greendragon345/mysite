import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { json } from "stream/consumers";


interface ShowData {
  showName: string;
  showImage: string;
}
const Tvshows = () => {
  const IP_ADDR = process.env.REACT_APP_IP_ADDR
  const addImage = async (tvshow: string) => {
    let image = await (
      await fetch(`http://${IP_ADDR}:7000/api/` + tvshow + "/getimage")
    ).text()
    let temparray: ShowData[] = [...ShowDataArr]
    temparray.push({
      showName: tvshow,
      showImage: image
    })
    console.log("here")
    console.log(temparray);
    setShowDataArr(temparray);
    console.log(ShowDataArr)
    SetUpdateData(UpdateData + 1);
  }
  const navigate = useNavigate();
  const [ShowDataArr, setShowDataArr] = useState<ShowData[]>([
    {
      showName: "none",
      showImage:
        "data:image/png;base64,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",
    },
  ]);
  const [UpdateData, SetUpdateData] = useState<number>(0);
  const [TestData, SetTestData] = useState<JSX.Element[]>([<p>nothing</p>]);
  const getData = async () => {
    let response = await (
      await fetch(`http://${IP_ADDR}:7000/api/tvshows`)
    ).text();
    let data = JSON.parse(response);
    let TempDataArr: ShowData[] = [];
    for (const key in data) {
      let image = await (
        await fetch(`http://${IP_ADDR}:7000/api/` + data[key] + "/getimage")
      ).text()
      TempDataArr.push({
        showName: data[key],
        showImage: image
      })
    }
    setShowDataArr(TempDataArr);
    console.log(ShowDataArr)
    SetUpdateData(UpdateData + 1);
    // Object.keys(data).map(async (val: string, index: number) => {
    //   addImage(data[index],)
    // });
  };

  useEffect(() => {
    console.log(ShowDataArr)

    getData();
  }, []);




  return (
    <div>
      <p>Tvshows:</p>
      <Grid container spacing={0} rowSpacing={0} columnSpacing={0}>

        {ShowDataArr?.map((item, index) => {
          console.log("hooas")
          console.log(item)
          console.log(item.showImage);
          console.log(item.showName);
          return (
            <Grid item xs={3} key={index} style={{}} >
              <div tabIndex={0} onClick={() => navigate('/seasons', { state: { Tvshow: item.showName } })}>

                <p key={index + 2} style={{ cursor: "pointer" }}>{item.showName}</p>
                <img
                  key={index + 3}
                  src={item.showImage}
                  style={{ width: " 50%", height: "50%", cursor: "pointer" }}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Tvshows;
