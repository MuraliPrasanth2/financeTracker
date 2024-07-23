import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useFirestoreCollection = (collectionName, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;
    console.log(error);

    useEffect(() => {
        setError(null);

        let ref = projectFirestore.collection(collectionName);

        if (query) {
            ref = ref.where(...query);
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy);
        }

        const unsub = ref.onSnapshot(
            (snapshot) => {
                let result = [];
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id });
                });
                setDocuments(result);
                setError(null);
            },
            (error) => {
                setDocuments(null);
                setError(error.message);
            },
        );

        return unsub;
    }, [query, orderBy, collectionName]);

    return { documents, error };
};
