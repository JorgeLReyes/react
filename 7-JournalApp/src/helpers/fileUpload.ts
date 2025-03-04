export const fileUpload = async (file: File) => {
  if (!file) return null;

  const cloudUrl = "https://api.cloudinary.com/v1_1/dr5eps5mm/upload";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "react-journal");

  try {
    const response = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("No se pudo subir imagen");

    const cloudResp = await response.json();
    return cloudResp.secure_url;
  } catch (e) {
    console.log(e);
    // throw new Error("Error uploading file to Cloudinary");
    return null;
  }
};
