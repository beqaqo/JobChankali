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

    if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
    }

    return data;
}

// jobs
export async function getJobs() {
    return request('/jobs');
}

export async function getJob(id) {
    return request(`/jobs/${id}`);
}

export async function createJob(data) {
    return request('/jobs', 'POST', data);
}

export async function updateJob(id, data) {
    return request(`/jobs/${id}`, 'PUT', data);
}

export async function deleteJob(id) {
    return request(`/jobs/${id}`, 'DELETE');
}

// applications
export async function submitApplication(data) {
    return request('/applications', 'POST', data);
}

export async function getMyApplications() {
    return request('/applications/mine');
}

export async function getJobApplications(jobId) {
    return request(`/applications/job/${jobId}`);
}


// TODO (Member A): export register(data), login(data), getMe()