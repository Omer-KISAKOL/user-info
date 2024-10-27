const API_BASE_URL = 'http://localhost:5000/api/users';

export async function addUser(name, surname, email, username) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, surname, email, username})
        });
        return await response.json();
    }catch(error) {
        console.error('Kullanıcı eklenirken hata oluştu: ', error);
        throw error;
    }
}

export async function getUsers() {
    try {
        const response = await fetch(API_BASE_URL);
        return await response.json();
    }catch(error) {
        console.error('Kullanıcılar alınırken hata oluştu: ', error);
        throw error;
    }
}

export async function updateUser(id, name, surname, email, username) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, surname, email, username})
        });
        return await response.json();
    }catch(error) {
        console.error('Kullanıcı güncellenirken hata oluştu: ', error);
        throw error;
    }
}

export async function deleteUser(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    }catch(error) {
        console.error('Kullanıcı silinirken hata oluştu: ', error);
        throw error;
    }
}