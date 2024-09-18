import express from "express"
import * as dotevnv from "dotenv"
import fs from "fs"

const tvshows_json_string = fs.readFileSync('./data/tvshows.json', 'utf-8')
const tvshows_json = JSON.parse(tvshows_json_string)

const movies_json_string = fs.readFileSync('./data/movies.json', 'utf-8')
const movies_json = JSON.parse(movies_json_string)


dotevnv.config()

if (!process.env.PORT) {
  console.log(`No port value specified...`)

}

const PORT = parseInt(process.env.PORT as string, 10)
const IP_ADDR = process.env.IP_ADDR as string
const app = express()

// console.log(tvshows_json["GAME.OF.THRONES"])


app.get('/watch/movies/:moviename', (req, res) => {
  const movie = req.params.moviename
  const videoPath = movies_json[movie]["path"]
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;


  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    if(parts[1] ? parseInt(parts[1], 10) : fileSize - 1 < 0){
      console.log("the parts[1] arg")
      console.log(parts[1])
      console.log("the paseInt")
      console.log(parseInt(parts[1], 10))
      console.log("filesize -1")
      console.log(fileSize - 1)
      
    }
    const tempend = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const end = (tempend > 0) ? tempend : 10000000;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.get('/watch/:tvshow/:season/:ep', (req, res) => {
  const tvshow = req.params.tvshow
  const videoPath = tvshows_json[req.params.tvshow][req.params.season]["episodes"][req.params.ep]["path"] // Path to your video file
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Access-Control-Allow-Origin': `http://${IP_ADDR}`,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});
// app.use(express.json())
// app.use(express.urlencoded({extended : true}))
// app.use(cors())
// app.use(helmet())
app.get('/api/tvshows', (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', "http://" + IP_ADDR + ":3000")
  res.setHeader('Access-Control-Allow-Origin', `*`)

  res.json(tvshows_json)
});
app.get('/api/movies', (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', "http://" + IP_ADDR + ":3000")
  res.setHeader('Access-Control-Allow-Origin', `*`)

  res.json(movies_json)
});
app.get('/api/test', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.json({ message: 'Hello, World!' });
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})










