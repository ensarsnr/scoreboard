// import React, { useState, useEffect } from "react";
// import { Button, Modal } from "react-bootstrap";
// import { collection, doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebase";

// function Timer({ index }) {
//   const [time, setTime] = useState(0);
//   const [timerId, setTimerId] = useState(null);
//   const [showButton, setShowButton] = useState(false);

//   const startTimer = () => {
//     if (timerId) return;
//     const id = setInterval(() => {
//       setTime((prevTime) => prevTime + 10);
//     }, 10);
//     setTimerId(id);
//     setShowButton(true);
//   };

//   const stopTimer = async () => {
//     if (!timerId) return;
//     clearInterval(timerId);
//     setTimerId(null);
//     setShowButton(false);

//     // Firestore'da kullanıcının skorunu güncelle
//     const userId = index; //Kullanıcının kimliği burada olacak. Ona göre güncelleme oluyor.
//     await updateScore(userId, time);

//     // console.log(timerId);
//   };
//   const updateScore = async (userId, newScore) => {
//     try {
//       const userDoc = doc(collection(db, "users"), userId);
//       await updateDoc(userDoc, {
//         score: newScore,
//       });
//       //   console.log('Skor güncellendi.');
//     } catch (error) {
//       //   console.error('Skor güncellenirken bir hata oluştu:', error);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (timerId) {
//         clearInterval(timerId);
//       }
//     };
//   }, [timerId]);

//   const formatTime = (time) => {
//     const milliseconds = time % 1000;
//     const seconds = Math.floor(time / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const formattedMilliseconds = milliseconds.toString().padStart(3, "0");
//     const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
//     const formattedMinutes = minutes.toString().padStart(2, "0");
//     return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
//   };

//   return (
//     <div>
//       <Modal.Body>
//         <div className="text-center text-9xl">{formatTime(time)}</div>
//       </Modal.Body>
//       <Modal.Footer className="flex justify-between">
//         {!showButton && (
//           <Button className="w-25" onClick={startTimer} variant="success">
//             Başlat
//           </Button>
//         )}
//         {showButton && (
//           <Button className="w-25" onClick={stopTimer} variant="danger">
//             Dur
//           </Button>
//         )}
//       </Modal.Footer>
//     </div>
//   );
// }

// export default Timer;
