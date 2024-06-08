export const fetchParticipantData = async () => {
    try {
      const response = await fetch('http://localhost:5000/participant');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching participant data:", error);
      return [];
    }
  };