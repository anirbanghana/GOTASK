import Bugsnag from "@bugsnag/js";
import { useEffect, useState } from "react";

import { FIREDB } from "../firebaseInstance";

export const useProviderChatStatus = firebaseId => {
  const [providerChatStatus, setProviderChatStatus] = useState(null);

  useEffect(() => {
    if (!firebaseId) return;

    const ref = FIREDB.ref("providerStatus/" + firebaseId);

    const fetchProviderChatStatusFromFirebase = () => {
      ref.on("value", snapshot => {
        try {
          let userStatus = snapshot.val();
          if (userStatus) {
            const status = userStatus?.status;
            setProviderChatStatus(status || null);
          }
        } catch (err) {
          console.error({ err });
          Bugsnag.notify(err);
          setProviderChatStatus(null);
        }
      });
    };

    fetchProviderChatStatusFromFirebase();

    return () => ref.off();
  }, [firebaseId]);

  return { providerChatStatus };
};
