import  blah from "./src/config.json"  assert { type: 'json' };
import {promises} from "fs"
import { parse } from 'node-html-parser';
import  {google} from 'googleapis';
import {GoogleAuth} from 'google-auth-library';

async function getText(): Promise<string> {
  let data = await fetch(blah.resumeLink);
  return data.text();
}

async function exportPdf(fileId: string) {

  // Get credentials and build service
  // TODO (developer) - Use appropriate auth mechanism for your app
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive',
  });
  const service = google.drive({version: 'v3', auth});

  try {
    const result = await service.files.export({
      fileId,
      mimeType: 'text/html',
    });
    console.log(result.status);
    return result;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}

let prelude = `---
import {getImage} from "@astrojs/image";
import image1_src from "../../public/images/image1.jpg"
import image2_src from "../../public/images/image2.png"
import image3_src from "../../public/images/image3.png"
import image4_src from "../../public/images/image4.png"
import image5_src from "../../public/images/image5.png"
import image6_src from "../../public/images/image6.png"
import image7_src from "../../public/images/image7.png"

let [image2, image3, image4, image5, image6, image7] = (await Promise.all([ image2_src, image3_src, image4_src, image5_src, image6_src, image7_src].map(i => getImage({src: i, width: 40 })))).map(a => a.src)
let image1 = (await getImage({src: image1_src, width: 540 })).src

---
`
function getTextFromFile(): Promise<string> {
  return promises.readFile("./a.html", "utf8");
}

async function run() {
  let data2 = await exportPdf("exportPdf");
  console.log(data2)
  let data = await getTextFromFile()
  let node = parse(data);
  console.log(node)
  let newData = node.toString();
  await promises.writeFile("./b.html", newData);
}

run();
