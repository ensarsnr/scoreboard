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
import {GiTrophyCup} from "react-icons/gi"

const style = {
  th: `px-6 py-3 2xl:text-xl lg:text-xs font-bold text-center text-gray-500 uppercase`,
  container: `flex h-screen flex-col mt-5`,
  row: `overflow-x-auto flex-grow`,
  col: `p-1.5 w-full inline-block align-middle`,
  tableBorder: `overflow-hidden border rounded-lg`,
  table: `w-full min-w-full divide-y divide-gray-200`,
  tbody: `divide-y divide-gray-200`,
  tdIndex: `py-3 pl-4 text-gray-500 text-center`,
  td: `px-6 py-4 2xl:text-7xl xl:text-4xl font-medium text-center text-gray-700 whitespace-nowrap`,
  tdIcon: `px-6 py-4 text-5xl font-medium whitespace-nowrap`,
  iconDiv: `px-6 py-4 text-center mx-auto`
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
      <div className={style.container} style={{ maxHeight: "80vh" }}>
        <div className={style.row}>
          <div className={style.col}>
            <div className={style.tableBorder}>
              <table className={style.table}>
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
                <tbody className={style.tbody}>
                  {users.map((e, index) => (
                    <tr key={index} > {/* className={index === 0 ? "bg-gold" : (index === 1 ? "bg-silver" : (index === 2 ? "bg-bronze" : ""))} */}
                      <td className={style.tdIndex}>
                        <div className="2xl:text-8xl xl:text-5xl">
                          <div className="m-auto">{index ===  0 ? <GiTrophyCup size={100} className="m-auto" color="#FFD700" />: index + 1}</div>
                        </div>
                      </td>
                      <td className={style.td}>    
                        {e.name} {e.surname}
                      </td>
                      <td className={style.td}>{formatTime(e.score)}</td>
                      <td className={style.tdIcon}>
                      <div className={style.iconDiv}>
                          <MdTimer
                            onClick={() => handleTimer(e.id)}
                            color="green"
                            size={70}
                            className="cursor-pointer m-auto"
                          />
                        </div>
                      </td>
                      <td className={style.tdIcon}>
                        <div className={style.iconDiv}>
                          <MdDelete
                            onClick={() => deleteUser(e.id)}
                            color="#ff0000"
                            size={70}
                            className="cursor-pointer m-auto"
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
          <Modal.Title className="text-6xl ">Kronometre</Modal.Title>
        </Modal.Header>
        {timer && <Timer index={selectedPlayerIndex} />}
      </Modal>
    </>
  );
}

export default ScoreBoard;
