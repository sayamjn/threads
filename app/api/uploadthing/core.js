const { currentUser } = require("@clerk/nextjs");
const { createUploadthing } = require("uploadthing/next");

const f = createUploadthing();

const getUser = async () => {
  return await currentUser();
};

const media = f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
  .middleware(async (req) => {
    // This code runs on your server before upload
    const user = await getUser();

    // If you throw, the user will not be able to upload
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Whatever is returned here is accessible in onUploadComplete as `metadata`
    return { userId: user.id };
  })
  .onUploadComplete(async ({ metadata, file }) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log("Upload complete for userId:", metadata.userId);

    console.log("file url", file.url);
  });

const ourFileRouter = {
  media,
};

module.exports = {
  ourFileRouter,
};
