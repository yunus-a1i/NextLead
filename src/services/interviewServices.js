// src/services/interviewService.js
const API_URL = "http://localhost:5000/api/interviews"; // adjust if needed

export const createInterview = async (interviewData, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // recruiter must be logged in
    },
    body: JSON.stringify(interviewData),
  });

  if (!res.ok) throw new Error((await res.json()).message || "Failed to post interview");
  return res.json();
};

export const getInterviews = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch interviews");
  return res.json();
};
