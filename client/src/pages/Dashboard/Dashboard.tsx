import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import './Dashboard.css'
  console.log("hello")

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>This is the dashboard</h2>
    </div>
  )
}

export default Dashboard;