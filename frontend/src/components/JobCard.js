// A single job in the list. Props: job = { id, title, company, location }
// TODO (Member C): design the card according to Figma (title as a link to /jobs/:id, company, location).
export default function JobCard({ job }) {
  return <div>{job.title}</div>;
}
