import React, {useEffect, useState} from 'react';
import {addUser, deleteUser, getUsers, updateUser} from "./utils/api.js";

function App() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('')
    const [editUserId, setEditUserId] = useState(null)

    const handleUsersClick = async () => {
        try {
            const response = await getUsers();
            setUsers(response);
        }catch(error) {
            console.error('Kullanıcılar yüklenemedi: ', error);
        }
    }
    console.log(users)
    useEffect(() => {
        handleUsersClick();
    },[users.length, editUserId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editUserId){
                const updatedUser = await updateUser(name, surname, email, userName, editUserId);
                setUsers(users.map((user) => (user.id === editUserId ? updatedUser : user)));
                setEditUserId(null);
            }else {
                const newUser = addUser(name, surname, email, userName);
                setUsers([...users, newUser]);
            }
        }catch(error) {
            console.error('Edit işlemi sırasında hata oluştu: ',error)
        }
        setName('')
        setSurname('')
        setEmail('')
        setUserName('')
        setEditUserId(null);
    }

    const handleEdit = async (user) => {
        setName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
        setUserName(user.username);
        setEditUserId(user.id);
    }

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
        }catch(error) {
            console.error('Kullanıcı silinemedi: ', error);
        }
    }

  return (
      <div className="grid row gap-3 mt-8 ml-6">

          <div className="flex flex-col col-start-1 col-end-3">
              <h2 className="text-2xl">{editUserId ? 'Kullanıcıyı Güncelle' : 'Kullanıcı Ekle'}</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                  <div>
                      <input
                          className="border-2 border-gray-300 rounded-lg bg-gray-800 py-1 px-2"
                          type="text"
                          placeholder="Ad"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                  </div>

                  <div>
                      <input
                          className="border-2 border-gray-300 rounded-lg bg-gray-800 py-1 px-2"
                          type="text"
                          placeholder="Soyad"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                      />
                  </div>

                  <div>
                      <input
                          className="border-2 border-gray-300 rounded-lg bg-gray-800 py-1 px-2"
                          type="email"
                          placeholder="E-posta"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>

                  <div>
                      <input
                          className="border-2 border-gray-300 rounded-lg bg-gray-800 py-1 px-2"
                          type="text"
                          placeholder="Kullanıcı Adı"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                      />
                  </div>

                  <div>
                      <button type="submit">{editUserId ? 'Güncelle' : 'Ekle'}</button>
                  </div>

              </form>
          </div>

          <div className="flex flex-col col-start-3 col-end-12 items-center">
              <button onClick={handleUsersClick}>Kayıtlı kullanıcılar</button>
              <h2 className="flex w-[96%] text-xl justify-end mr-36">Kayıtlı kullanıcı sayısı: {users.length}</h2>

              <ul className="grid grid-cols-3 gap-2 mt-4">
                  {users ? (
                      users.map((user) => (
                          <li key={user.id} className="rounded-lg border border-white p-2 bg-gray-700 flex justify-between gap-2">
                              <div>
                                  <div className="uppercase">{user.name}</div>
                                  <div className="uppercase">{user.surname}</div>
                                  <div>{user.email}</div>
                                  <div>{user.username}</div>
                              </div>
                              <div className="flex flex-col  ">
                                  <button onClick={() => handleEdit(user)}>Düzenle</button>
                                  <button onClick={() => handleDelete(user.id)}>Sil</button>
                              </div>
                          </li>
                      ))
                  ) : (
                      <li>Kayıtlı kullanıcı yok.</li>
                  )}
              </ul>
          </div>
      </div>
  )
}

export default App
