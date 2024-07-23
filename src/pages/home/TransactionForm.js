import React, { useEffect, useState } from "react";
import { useFirestoreDoc } from "../../hooks/useFirestoreDoc";

export default function TransactionForm({ uid }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const { response, addDocument } = useFirestoreDoc("transactoins");

    const handleSubmit = (e) => {
        e.preventDefault();
        const doc = { name, amount, uid };
        addDocument(doc);
    };

    useEffect(() => {
        if (response.success) {
            setName("");
            setAmount("");
        }
    }, [response.success]);

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        disabled={response.isPending}
                    />
                </label>
                <label>
                    <span>Amount</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        disabled={response.isPending}
                    />
                </label>
                <button disabled={response.isPending}>Add transaction</button>
            </form>
        </>
    );
}
