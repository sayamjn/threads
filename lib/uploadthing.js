import { generateReactHelpers } from "@uploadthing/react/hooks";
const { OurFileRouter } = require("../app/api/uploadthing/core");

const { useUploadThing, uploadFiles } = generateReactHelpers(OurFileRouter);

module.exports = {
  useUploadThing,
  uploadFiles,
};
