export async function getVans() {
  const res = await fetch('/api/vans');
  if (!res.ok) {
    const err = {
      message: 'Failed to fetch vans',
      statusText: res.statusText,
      status: res.status,
    };
    throw err;
  }
  const data = await res.json();

  return data.vans;
}

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : '/api/host/vans';
  const res = await fetch(url);
  if (!res.ok) {
    const err = {
      message: 'Failed to fetch vans',
      statusText: res.statusText,
      status: res.status,
    };
    throw err;
  }
  const data = await res.json();
  return data.vans;
}

export async function loginUser(creds) {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
    throw err;
  }

  return data;
}
