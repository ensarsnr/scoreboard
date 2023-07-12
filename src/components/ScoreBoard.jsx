import React, { useEffect, useState } from "react";
import { MdDelete, MdTimer } from "react-icons/md";
import { Modal } from "react-bootstrap";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import Timer from "./Timer";

// ####################################################
// yarın buralara style'ları eklersin düzenlersinn!!!!!
const style = {
  th: `px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase`,
};

function ScoreBoard() {
  const [users, setUsers] = useState([]);
  const [timer, setTimer] = useState(false);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null); // Seçili oyuncunun indexini tutacak state

  // Elemanları silmeye yarayan fonksiyon.
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      // console.log("deleted player");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubcribe = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
    const sortedUsers = users.sort((a, b) => b.score - a.score);
       setUsers(sortedUsers);
    //    console.log(doc.id)
    });
    return () => unsubcribe();
  }, []);

  const closeTimer = () => {
    setTimer(false);
  };

  const handleTimer = (index) => {
    setSelectedPlayerIndex(index); // Benzersiz id'yi seçili oyuncu indexi yerine kullan
    setTimer(true);
  };

  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedMilliseconds = milliseconds.toString().padStart(3, "0");
    const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };

  return (
    <>
      <div className="flex h-screen flex-col mt-5" style={{ maxHeight: "80vh" }}>
        <div className="overflow-x-auto flex-grow">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className={style.th}>
                      Sıralama
                    </th>
                    <th scope="col" className={style.th}>
                      Yarışmacı
                    </th>
                    <th scope="col" className={style.th}>
                      Skor
                    </th>
                    <th scope="col" className={style.th}>
                      Başlat
                    </th>
                    <th scope="col" className={style.th}>
                      Kaldır
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((e, index) => (
                    <tr key={index}>
                      <td className="py-3 pl-4 text-center">
                        <div className="text-5xl">
                          <div className="mr-3">{index + 1}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-5xl font-medium text-center text-gray-800 whitespace-nowrap">
                        {e.name} {e.surname}
                      </td>
                      <td className="px-6 py-4 text-5xl font-medium text-center text-gray-800 whitespace-nowrap">
                        {formatTime(e.score)}
                      </td>
                      <td className="px-6 py-4 text-5xl font-medium text-center whitespace-nowrap">
                        <div className="flex justify-center items-center">
                          <MdTimer
                            onClick={() => handleTimer(e.id)}
                            color="green"
                            size={40}
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-5xl font-medium text-center whitespace-nowrap">
                        <div className="flex justify-center items-center">
                          <MdDelete
                            onClick={() => deleteUser(e.id)}
                            color="red"
                            size={40}
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={timer}
        onHide={closeTimer}
        centered
        dialogClassName="modal-position"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-6xl">Zamanlayıcı</Modal.Title>
        </Modal.Header>
        {timer && <Timer index={selectedPlayerIndex} />}
      </Modal>
    </>
  );
}

export default ScoreBoard;
