import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "PENDING":
            return { isPending: true, error: null, doc: null, success: false };
        case "ADD_DOCUMENT":
            return {
                isPending: false,
                error: null,
                doc: action.payload,
                success: true,
            };
        case "DELETE_DOCUMENT":
            return {
                isPending: false,
                error: null,
                doc: null,
                success: true,
            };
        case "ERROR":
            return {
                isPending: false,
                error: action.payload,
                doc: null,
                success: false,
            };
        default:
            return state;
    }
};

const initialState = {
    isPending: false,
    error: null,
    doc: null,
    success: false,
};

export const useFirestoreDoc = (collectionName) => {
    const [state, dispatch] = useReducer(firestoreReducer, initialState);
    const [isDisabled, setIsDisabled] = useState(false);

    const dispatchIfNotDisabled = (action) => {
        if (!isDisabled) {
            dispatch(action);
        }
    };

    const ref = projectFirestore.collection(collectionName);

    const addDocument = async (doc) => {
        dispatchIfNotDisabled({ type: "PENDING" });
        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });
            dispatchIfNotDisabled({ type: "ADD_DOCUMENT", payload: addedDocument });
        } catch (error) {
            dispatchIfNotDisabled({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    const deleteDocument = async (id) => {
        dispatchIfNotDisabled({ type: "PENDING" });
        try {
            await ref.doc(id).delete();
            dispatchIfNotDisabled({ type: "DELETE_DOCUMENT" });
        } catch (error) {
            dispatchIfNotDisabled({
                type: "ERROR",
                payload: "couldn't delete the transactin",
            });
        }
    };

    useEffect(() => {
        setIsDisabled(false);
        return () => setIsDisabled(true);
    }, []);

    return { response: state, addDocument, deleteDocument };
};
