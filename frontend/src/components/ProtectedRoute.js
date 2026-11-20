// TODO (Member A): if no user is logged in -> redirect to /login (<Navigate to="/login" />).
//   If the user's role is not in the `roles` prop -> show "no access" message.
//   Otherwise render {children}.
export default function ProtectedRoute({ roles, children }) {
  return children;
}
