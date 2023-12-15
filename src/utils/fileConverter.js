import { extractFileNameFromS3URL } from "./extractFileName";

const fileConverter = async (fileUrl, docKey) => {
  // expecting AWS s3 presigned Url
  try {
    const response = await fetch(fileUrl);

    // Retrieve its body as a ReadableStream

    const reader = response.body.getReader();
    const chunks = [];
    const contentType = response.headers.get("content-type");
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
    }

    const fileData = new Uint8Array(
      chunks.reduce((acc, chunk) => [...acc, ...chunk], [])
    );

    // Create a Blob from the Uint8Array
    const blob = new Blob([fileData], { type: contentType });

    // Create a File from the Blob with a specified name
    const fileName = extractFileNameFromS3URL(docKey);

    const file = new File([blob], fileName, {
      type: contentType,
    });

    const localUrl = URL.createObjectURL(file);
    return localUrl;

    // Add the File to your state or handle it as needed
  } catch (error) {
    console.error("Error fetching and reading document:", error);
  }
};

export default fileConverter;
