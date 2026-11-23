// All calls to the backend go through this file.
// Basic helper: request('/jobs') or request('/jobs', 'POST', { title: '...' })

export async function request(path, method = 'GET', body) {
    const headers = { 'Content-Type': 'application/json' };

    // If the user is logged in, send their token so the backend knows who they are
    const token = localStorage.getItem('token');
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`/api${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    // We sent a token but the backend rejected it (expired or invalid):
    // log the user out and send them to the login page
    if (res.status === 401 && token) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

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

// auth
export async function register(data) {
    return request('/auth/register', 'POST', data);
}

export async function login(data) {
    return request('/auth/login', 'POST', data);
}

export async function getMe() {
    return request('/auth/me');
}
