const fileConverter = async (fileUrl, setDocs) => {
  // expecting AWS s3 presigned Url
  try {
    // Fetch the original file
    console.log("fileUrl", fileUrl);
    const response = await fetch(fileUrl);
    console.log("response", response);

    // Retrieve its body as a ReadableStream
    console.log(response.headers.get("content-type").split(";"));
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
    console.log("file data", fileData);

    // Create a Blob from the Uint8Array
    const blob = new Blob([fileData], { type: contentType });

    // Create a File from the Blob with a specified name
    const fileName = "sample.docx";
    const file = new File([blob], fileName, {
      type: contentType,
    });

    // Add the File to your state or handle it as needed
    console.log("File:", file);

    setDocs((prev) => [...prev, file]);
  } catch (error) {
    console.error("Error fetching and reading document:", error);
  }
};

export default fileConverter;
