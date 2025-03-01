import oss from "./oss";

const clearBucket = async () => {
  let hasMoreObjects = true;
  try {
    while (hasMoreObjects) {
      const list = await oss.list({ prefix: "", "max-keys": 1000 }, {});
      if (list.objects.length) {
        await Promise.all(list.objects.map(({ name }) => oss.delete(name)));
      } else {
        hasMoreObjects = false;
      }
    }
    console.log("Bucket cleared successfully.");
  } catch (error) {
    console.error("Error clearing bucket:", error);
    throw error;
  }
};

export default clearBucket;
