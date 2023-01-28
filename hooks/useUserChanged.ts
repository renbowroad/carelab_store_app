import { useEffect } from "react";
import { useRouter } from "next/router";
import { Cookie } from "universal-cookie";
import { getAuth } from "firebase/auth";
import { addDoc, getFirestore } from "firebase/firestore";
import { Firestore, collection } from "firebase/firestore";
import { db } from "../firebase/client"

export let unSubMeta: () => void;

export const useUserChanged = () => {
    const cookie = new Cookie();
    const router = useRouter();
    const HASURA_TOKEN_KEY = "https://hasura.io/jwt/claims";
    useEffect(() => {
        const unSubUser = getAuth().onAuthStateChanged(async (user) => {
            if (user) {
                const token = await user.getIdToken(true);
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaims = idTokenResult.claims[HASURA_TOKEN_KEY];
                if (hasuraClaims) {
                    cookie.set('token', token, { path: '/' })
                    router.push('/task')
                } else {
                    const userRef = addDoc(collection(db, 'user_meta'), {
                        user.uid,
                    })
                    unSubMeta = userRef.onSnapshot(async () => {
                        const token = await user.getIdToken(true);
                        const idTokenResult = await user.getIdTokenResult();
                        const hasuraClaims = idTokenResult.claims[HASURA_TOKEN_KEY];
                        if (hasuraClaims) {
                            cookie.set('token', token, { path: '/' })
                            router.push('/task')
                        }
                    })
                }
            }
        });
        return () => {
            unSubUser();
        };
    }, []);
    return {}
};
