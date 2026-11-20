// All calls to the backend go through this file.
// Basic helper: request('/jobs') or request('/jobs', 'POST', { title: '...' })
export async function request(path, method = 'GET', body) {
  // TODO (Member A): add the JWT token to the headers (Authorization: Bearer <token>)
  const res = await fetch(`/api${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = res.status === 204 ? null : await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

// TODO (Member A): export register(data), login(data), getMe()
// TODO (Member B): export getJobs(), getJob(id), createJob(data), updateJob(id, data), deleteJob(id)
// TODO (Member B): export submitApplication(data), getMyApplications(), getJobApplications(jobId)
