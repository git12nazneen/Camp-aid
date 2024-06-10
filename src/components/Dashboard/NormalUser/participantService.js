

export const fetchParticipantData = async (email) => {
  try {
    const response = await fetch('http://localhost:8000/participant');
    const data = await response.json();
    // Filter the data by email
    const filteredData = data.filter(item => item.participantEmail === email);
    return filteredData;
  } catch (error) {
    console.error("Error fetching participant data:", error);
    return [];
  }
}
