import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { MdDelete, MdTimer } from "react-icons/md";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Button, Modal } from "react-bootstrap";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

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
  iconDiv: `px-6 py-4 text-center mx-auto`,
};

function SecondPage() {
  // Hooks
  const [users, setUsers] = useState([]);
  const [timer, setTimer] = useState(false);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null); // Seçili oyuncunun indexini tutacak state
  const [deleteClick, setDeleteClick] = useState(false);
  const [deletePlayerId, setDeletePlayerId] = useState(null); // Silinecek oyuncunun ID'sini tutacak state

  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [showButton, setShowButton] = useState(false);

  // Functions
  const startTimer = () => {
    if (timerId) return;
    const id = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
    setTimerId(id);
    setShowButton(true);
  };

  const stopTimer = async () => {
    if (!timerId) return;
    clearInterval(timerId);
    setTimerId(null);
    setShowButton(false);
    setTimer(false);

    // Firestore'da kullanıcının skorunu güncelle
    const userId = users[selectedPlayerIndex]?.id;
    await updateScore(userId, time);

    setTime(0); // Skoru sıfırla
  };
  const updateScore = async (userId, newScore) => {
    try {
      const userDoc = doc(collection(db, "users"), userId);
      await updateDoc(userDoc, {
        score: newScore,
      });
      //   console.log('Skor güncellendi.');
    } catch (error) {
      //   console.error('Skor güncellenirken bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  // Elemanları silmeye yarayan fonksiyon.
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      // console.log("deleted player");
      setDeleteClick(false); // Kaldırma işleminden sonra modalı kapat
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (index) => {
    setSelectedPlayerIndex(index);
    setDeletePlayerId(users[index]?.id);
    setDeleteClick(true);
  };

  // firebase'de ki users koleksiyonumu kontrol eder bir değişiklik olduğunda ise tekrardan listeler.

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allUsers = [];
      querySnapshot.forEach((doc) => {
        allUsers.push({ ...doc.data(), id: doc.id });
      });
      const sortedUsers = allUsers.sort((a, b) => b.score - a.score);
      setUsers(sortedUsers.slice(5)); // Sadece 5'ten sonraki oyuncuları al
    });
    return () => unsubscribe();
  }, []);

  const closeTimer = () => {
    setTimer(false);
  };

  const closeDelete = () => {
    setDeleteClick(false);
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
      <div>
        <NavBar />
        <Link to={"/"}>
          <BsFillArrowLeftSquareFill
            color="gray"
            className="cursor-pointer float-right mr-16"
            size={40}
          />
        </Link>
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
                      <tr
                        className={
                          index % 2 === 0
                            ? "bg-gradient-to-bl from-white to-blue-400"
                            : ""
                        }
                        key={index}
                      >
                        {/* className={index === 0 ? "bg-gold" : (index === 1 ? "bg-silver" : (index === 2 ? "bg-bronze" : "")) */}
                        {/* İlk üç kişiye kupa iconu koydum. Gold-Silver-Bronze */}
                        <td className={style.tdIndex}>
                          <div className="2xl:text-8xl xl:text-5xl">
                            <div className="m-auto">{index + 6}</div>
                          </div>
                        </td>
                        <td className={style.td}>
                          {e.name} {e.surname}
                        </td>
                        <td className={style.td}>{formatTime(e.score)}</td>
                        <td className={style.tdIcon}>
                          <div className={style.iconDiv}>
                            <MdTimer
                              onClick={() => handleTimer(index)}
                              color="green"
                              size={70}
                              className="cursor-pointer m-auto"
                            />
                          </div>
                        </td>
                        <td className={style.tdIcon}>
                          <div className={style.iconDiv}>
                            <MdDelete
                              onClick={() => handleDelete(index)}
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
      </div>
      <Modal
        onHide={closeTimer}
        show={deleteClick}
        centered
        dialogClassName="modal-position modal-wide"
      >
        <Modal.Header>
          <Modal.Title>Kullanıcıyı Kaldır</Modal.Title>
        </Modal.Header>
        <Modal.Body onClick={closeDelete} className="d-flex justify-between">
          <Button>İptal Et</Button>
          <Button onClick={() => deleteUser(deletePlayerId)} variant="danger">
            Kaldır
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        show={timer}
        onHide={closeTimer}
        centered
        dialogClassName="modal-position modal-wide"
        size="xl"
        backdrop="static" // Modal dışında tıklama işlemini iptal et
      >
        <Modal.Header closeButton={true}>
          {" "}
          {/* Çarpıyı gizlemek */}
          <Modal.Title className="text-6xl">Kronometre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center text-9xl">{formatTime(time)}</div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          {!showButton && (
            <Button className="w-25" onClick={startTimer} variant="success">
              Başlat
            </Button>
          )}
          {showButton && (
            <Button className="w-25" onClick={stopTimer} variant="danger">
              Dur
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SecondPage;
