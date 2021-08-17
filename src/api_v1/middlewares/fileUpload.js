const path = require("path");

module.exports = function (req, res, next) {
  console.log(req);
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  console.log(sampleFile);

  uploadPath = path.resolve(
    process.cwd() + "/uploads/" + sampleFile.name + sampleFile.md5
  );

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(400).send(err);

    console.log("upload successful");
  });
  req.body.filepath = uploadPath;
  next();
};
