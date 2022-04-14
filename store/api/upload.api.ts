import { BaseUrl } from "../../constants/BaseUrl";

export async function uploadImage(
  imagePath: string
): Promise<{ path: string; uri: string; _id: string }> {
  let localUri = imagePath;
  let filename = localUri.split("/").pop();
  if (!filename) throw new Error("Not found filename");

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // @ts-ignore: Unreachable code error
  formData.append("file", { uri: localUri, name: filename, type });
  const res = await fetch(`${BaseUrl}/images`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

  return (await res.json()) as { path: string; uri: string; _id: string };
}
