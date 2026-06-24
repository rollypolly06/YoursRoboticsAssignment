const BASE_URL = "http://localhost:8000";

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  return res.json();
}

export async function uploadFile(files) {
    const formData = new FormData();

    for (const file of files) {
      formData.append("files", file);
    }

    const res = await fetch(`${BASE_URL}/data`, {
        method: "POST",
        body: formData
    });

    return await handleResponse(res);
}

export async function getRobots() {
  const res = await fetch(`${BASE_URL}/robots`);
  return await handleResponse(res);
}