import axiosInstance from "../api/axiosInstance";

export async function createDriveAttendee(payload, token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await axiosInstance.post('/drive/driveAttending', payload, { headers });
  return res.data;
}