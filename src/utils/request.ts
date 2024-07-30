const BASE_URL = "http://127.0.0.1:5000";

export default function request(url: string, options?: RequestInit) {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("token");
    try {
      const { body, headers = {}, ...restOptions } = options || {};
      const res = await fetch(BASE_URL + url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          'Authorization': token ? `Bearer ${token}` : '',
          // ...headers,
        },
        ...restOptions,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.code === 200) {
         resolve(data);

      } else {
        if(data.code === 401) {
          localStorage.removeItem("token");
          window.location.href = '/login'
        }
        alert(data.message);
        reject(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      reject(error);
    }
  });
}
