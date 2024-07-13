export const getAllPasswords = async () => {
  try {
    const response = await fetch('http://192.168.1.109:9500/api/credentials');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
};


export const addPassword = async (service, loginId, password) => {
  const data = {
    service,
    loginId,
    password,
    metadata: {
      alg: "SHA256"
    } 
  }
  try {
    const response = await fetch('http://192.168.1.109:9500/api/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

export const deletePassword = async (id) => {
  try {
    const response = await fetch(`http://192.168.1.109:9500/api/credentials/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return true;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return false;
  }
}