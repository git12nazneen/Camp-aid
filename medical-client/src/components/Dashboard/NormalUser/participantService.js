

export const fetchParticipantData = async (email) => {
  try {
    const response = await fetch('https://server-two-sage-80.vercel.app/participant');
    const data = await response.json();
    // Filter the data by email
    const filteredData = data.filter(item => item.participantEmail === email);
    return filteredData;
  } catch (error) {
    console.error("Error fetching participant data:", error);
    return [];
  }
}
