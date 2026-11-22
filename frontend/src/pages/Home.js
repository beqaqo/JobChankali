// TODO (Member C): design the home page (hero text, search box, latest jobs) according to Figma.
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  navigate('/jobs');
}
