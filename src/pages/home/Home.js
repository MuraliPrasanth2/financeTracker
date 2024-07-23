import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestoreCollection } from "../../hooks/useFirebaseCollection";
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const Home = () => {
    const { user } = useAuthContext();
    const { documents } = useFirestoreCollection(
        "transactoins",
        ["uid", "==", user.uid],
        ["createdAt", "desc"],
    );
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <TransactionList transactions={documents} uid={user.uid} />
            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    );
};

export default Home;
