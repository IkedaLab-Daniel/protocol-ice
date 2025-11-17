import { useState } from "react"
import type { Vote } from "../types";
import { voteAPI } from "../services/api";

export const useVotes = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  const fetchVotes = async () => {
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
}