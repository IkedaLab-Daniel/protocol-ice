import { useState } from "react"
import type { CreateVoteInput, Vote } from "../types";
import { voteAPI } from "../services/api";

export const useVotes = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  const fetchMyVotes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await voteAPI.getMyVotes();
      if (response.success && response.data) {
        setVotes(response.data);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch votes');
    } finally {
      setLoading(false)
    }
  }

  const createVote = async (data: CreateVoteInput) => {
    setError(null);
    try {
      const response = await voteAPI.createVote(data);
      if (response.success && response.data) {
        setVotes((prev) => [response.data!, ...prev]);
        return response.data;
      }
    } catch (error: any) {
      const message = error.response?.data?.message || ' Failed to create vote';
      setError(message);
      throw new Error(message);
    }
  }

  const deleteVote = async (id: string) => {
    setError(null);
    try {
      const response = await voteAPI.deleteVote(id);
      if (response.success) {
        setVotes((prev) => prev.filter((vote) => vote._id !== id));
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete vote';
      setError(message);
      throw new Error(message);
    }
  };

  return {
    votes,
    loading,
    error,
    fetchMyVotes,
    createVote,
    deleteVote
  };
};