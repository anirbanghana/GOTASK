import { useEffect, useState } from "react";
import { FIREDB } from "../firebaseInstance";
import Bugsnag from "@bugsnag/js";

const ONLINE_STATUS = "Online";
const OFFLINE_STATUS = "Offline";
const TYPING_STATUS = "Typing";

const acceptableAvailabilityTypes = [
  ONLINE_STATUS,
  OFFLINE_STATUS,
  TYPING_STATUS,
];

const getDefaultChatStatus = () => ONLINE_STATUS;

const isValidStatus = status => acceptableAvailabilityTypes.includes(status);

export const useChatStatus = firebaseId => {
  const [chatStatus, setChatStatus] = useState(null);

  useEffect(() => {
    if (!firebaseId) return;

    const ref = FIREDB.ref("Status/" + firebaseId);

    const fetchChatStatusFromFirebase = () => {
      ref.on("value", snapshot => {
        try {
          const status = snapshot.val();
          if (status && isValidStatus(status)) {
            setChatStatus(status);
          } else {
            setChatStatus(getDefaultChatStatus());
          }
        } catch (err) {
          console.error({ err });
          Bugsnag.notify(err);
          setChatStatus(getDefaultChatStatus());
        }
      });
    };

    fetchChatStatusFromFirebase();

    return () => ref.off();
  }, [firebaseId]);

  return { chatStatus };
};
