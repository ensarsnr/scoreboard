import React, { useState } from 'react'
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const style = {
  input: `text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4`,
  button: `w-100 mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider`,
};

function FormComp() {
  // Hooks
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [err, setErr] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name === "" || surname === "") {
      setErr(true);
    }
    else {
      setErr(false);
     await addDoc(collection(db, "users"), {
      name: name,
      surname: surname,
      score: 0,
    })
    }
    // console.log(docRef);
    setName("");
    setSurname("");

  }

  return (
    <div className="flex ">
    <div className="m-auto">
      <form onSubmit={handleSubmit}>
        <input
        // ref={input => input && input.focus()}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={style.input}
          placeholder="ad"
        />
        <input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className={style.input}
          placeholder="soyad"
        />
        <button  className={style.button} type="submit">
          Ekle
        </button>
        {err && <p className='mt-2 text-center text-danger'>Alanları doldurunuz</p>}
      </form>
    </div>
  </div>
  )
}

export default FormComp