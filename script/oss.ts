import OSS from "ali-oss";

const oss = new OSS({
  bucket: process.env.OSS_BUCKET_NAME as string,
  region: process.env.OSS_REGION,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID as string,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET as string,
  // @ts-expect-error v4 auth type not supported yet
  authorizationV4: true,
});

export default oss;
