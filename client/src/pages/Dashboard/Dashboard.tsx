import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import './Dashboard.css'
import { useVotes } from '../../hooks/useVotes';
import { useEffect, useState, type FormEvent } from 'react';
import type { CreateVoteInput } from '../../types';
  console.log("hello")

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { votes, loading, error, fetchMyVotes, createVote, deleteVote } = useVotes();

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<CreateVoteInput>({
    type: 'positive',
    label: '',
    score: 1,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMyVotes();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createVote(formData);
      setShowForm(false);
      setFormData({ type: 'positive', label: '', score: 1});
    } catch (error: any) {
      // ! Error handled by the hook
    } finally {
      setSubmitting(false)
    }
  }

  console.log(votes);

  return (
    <div>
      <h2>This is the dashboard</h2>
    </div>
  )
}

export default Dashboard;