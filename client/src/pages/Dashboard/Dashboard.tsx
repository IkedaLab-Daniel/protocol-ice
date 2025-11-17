import { useAuth } from '../../context/AuthContext'
import './Dashboard.css'
  console.log("hello")

const Dashboard = () => {

  const { user } = useAuth();
  console.log( user )

  return (
    <div>
      <h2>This is the dashboard</h2>
    </div>
  )
}

export default Dashboard;