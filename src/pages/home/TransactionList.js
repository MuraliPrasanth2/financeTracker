import styles from "./Home.module.css";
import React from "react";
import { useFirestoreDoc } from "../../hooks/useFirestoreDoc";

export default function TransactionList({ transactions }) {
    const { deleteDocument } = useFirestoreDoc("transactoins");
    const handleDelete = (e, id) => {
        e.preventDefault();
        deleteDocument(id);
    };
    return (
        transactions && (
            <ul className={styles.transactions}>
                {transactions.map((transaction) => {
                    return (
                        <li key={transaction.id} className={styles.transaction}>
                            <p className={styles.name}> {transaction.name}</p>
                            <p className={styles.amount}> {transaction.amount}</p>
                            <button
                                className={styles.deletebtn}
                                onClick={(e) => handleDelete(e, transaction.id)}
                            >
                                x
                            </button>
                        </li>
                    );
                })}
            </ul>
        )
    );
}
