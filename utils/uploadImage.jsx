const uploadImage = (_pic_) => {
  if (_pic_ === undefined) {
    return { error: "Please select at least one image" };
  }
  if (_pic_.type === "image/jpeg" || _pic_.type === "image/png") {
    const data = new FormData();
    data.append("file", _pic_);
    data.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
    );
    data.append(
      "cloud_name",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
    );
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        return { img_url: data.url.toString() };
      })
      .catch((err) => {
        return { error: `${err} ` };
      });
  } else {
    return { error: "Please select at least one image" };
    return;
  }
};
