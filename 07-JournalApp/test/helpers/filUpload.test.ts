import { describe, expect, test } from "@jest/globals";
import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dr5eps5mm",
  api_key: "166522793361852",
  api_secret: "vyHbHdYVJllCRfCk4N8Ydm5e7-k",
  secure: true,
});
describe("init", () => {
  test("debe subir el archivo correctamente a cloudinary", async () => {
    const imageURl =
      "https://images.steamusercontent.com/ugc/1479946668213189172/964EEF9F7CFC36471E18E0CF5556D4C95563805C/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false";

    const resp = await fetch(imageURl);
    const img = await resp.blob();
    const file = new File([img], "shinobu-test.jpeg");
    const url = await fileUpload(file);
    console.log(url);
    const imageId = url
      .split("/")
      .at(-1)
      .replace(/\.(jpg|jpeg)/, "");
    console.log(imageId);
    // expect(url).toStrictEqual(expect.any(String));
    // await cloudinary.api.delete_resources(["journal/"+imageId]);
    await cloudinary.uploader.destroy(imageId, {
      resource_type: "image",
    });
  });
  test("debe de retornar null", async () => {
    const file = new File([], "shinobu.jpeg");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
