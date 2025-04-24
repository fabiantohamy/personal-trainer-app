export function getCustomers() {
  return fetch(`${import.meta.env.VITE_API_URL}/customers`)
  .then((response) => {
    if (!response.ok) 
      throw new Error("Failed to fetch customers");

    return response.json();
  });
}

export function getTrainings() {
  return fetch(`${import.meta.env.VITE_API_URL}/gettrainings`)
  .then((response) => {
    if (!response.ok)
       throw new Error("Failed to fetch trainings");

    return response.json();
  });
}
