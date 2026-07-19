const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function signup(email, password) {
  const res = await fetch(`${API_BASE}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function fetchProgress(token) {
  const res = await fetch(`${API_BASE}/api/progress`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function saveProgress(token, progress) {
  const res = await fetch(`${API_BASE}/api/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(progress)
  });
  return res.json();
}

export async function fetchMe(token) {
  const res = await fetch(`${API_BASE}/api/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
