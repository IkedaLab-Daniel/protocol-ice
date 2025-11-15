/**
 * > Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * > Format date to short format (without time)
 */
export const formatDateShort = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * > Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email)
}

/**
 * > Validate password strength
 */
// TODO: Improve strong password validation
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * > Validate Username
 */
export const isValidUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 15;
};

/**
 * > Get error messag from error object
 */
export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

/**
 * > Calculated percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * > Format number with sign
 */
export const formatScore = (score: number): string => {
  return score > 0 ? `+${score}` : `${score}`;
};