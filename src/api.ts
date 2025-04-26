export function getCustomers() {
  return fetch(`${import.meta.env.VITE_API_URL}/customers`)
  .then((response) => {
    if (!response.ok) 
      throw new Error("Failed to fetch customers");

    return response.json();
  });
}

export function addCustomer(customer: object) {
  return fetch(`${import.meta.env.VITE_API_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(customer)
  })
  .then(response => {
    if (!response.ok) 
      throw new Error("Failed to add customer");

    return response.json();
  });
}

export function deleteCustomer(url: string) {
  return fetch(url, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) 
      throw new Error("Failed to delete customer");
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

export function addTraining(training: object) {
  return fetch(`${import.meta.env.VITE_API_URL}/trainings`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(training)
  })
  .then(response => {
    if (!response.ok) 
      throw new Error("Failed to add training");

    return response.json();
  });
}

export function deleteTraining(id: number) {
  return fetch(`${import.meta.env.VITE_API_URL}/trainings/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) 
      throw new Error("Failed to delete training");
  });
}
