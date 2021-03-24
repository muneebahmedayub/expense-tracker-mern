import React, { RefObject, useEffect, useRef, useState } from "react";
//Styles
import { Grid, makeStyles } from "@material-ui/core";
//Components
import Info from "../components/Info";
import TransactionHistory from "../components/TransactionHistory";

import gsap from "gsap";

import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, editTransaction, loadTransactions } from "../redux/actions/transactionActions";
import dayjs from "dayjs";
import { RootState } from "../Types";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: "90vh",
    overflowY: "scroll",
  },
});

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userTransactions = useSelector((state: RootState) => state.auth.user.transactions)

  // States
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [editingRef, setEditingRef] = useState<any>(null);
  const [currentEditingId, setCurrentEditingId] = useState<any>(null)

  useEffect(() => {
    dispatch(loadTransactions(userTransactions))
  }, [])

  // ALl Refs of transaction history
  const allRef = useRef<HTMLDivElement[]>([]);
  const addToRef = (el: RefObject<HTMLDivElement>) => {
    if (el.current && !allRef.current.includes(el.current)) {
      allRef.current.push(el.current);
    }
  };

  // This function will delete a transaction
  const handleDelete = async (
    id: string | undefined,
    ObjRef: RefObject<HTMLDivElement>
  ) => {
    gsap.to(allRef.current, { duration: 0, pointerEvents: "none" });
    gsap.to(ObjRef.current, { duration: 0.3, autoAlpha: 0, ease: "circ.out" });

    dispatch(deleteTransaction(id, ObjRef, allRef));
  };

  // This function will add values and animate transaction to edit
  const handleEditIcon = (
    id: string | undefined,
    description: string,
    amount: number,
    income: boolean,
    ObjRef: RefObject<HTMLDivElement>
  ) => {
    setEditingRef(ObjRef);
    gsap.to(ObjRef.current, {
      duration: 0.5,
      translateX: "-100%",
      autoAlpha: 0,
    });
    gsap.to(allRef.current, { duration: 0, pointerEvents: "none" });
    if (ObjRef.current !== null) {
      const index = allRef.current.indexOf(ObjRef.current);
      gsap.to(allRef.current.slice(0, index), {
        duration: 0.5,
        translateY: "-100%",
        ease: "circ.out",
      });
      gsap.to(allRef.current.slice(0, index), {
        duration: 0,
        translateY: "0",
        ease: "circ.out",
      });
    }
    setValue(!income ? 1 : 0)
    setDescription(description);
    setAmount(amount);
    setCurrentEditingId(id)
    setIsEditing(true);
  };

  // This will edit the transaction data
  const handleEditButton = (value: number, setIsLoading: (isLoading: boolean) => void) => {
    setIsLoading(true)

    const now = dayjs().format()
    const trans = {
      description,
      amount,
      income: value ? false : true,
      updatedAt: now
    }

    dispatch(editTransaction(currentEditingId, trans))

    gsap.to(allRef.current, { duration: 0, pointerEvents: "all" });
    
    const index = allRef.current.indexOf(editingRef.current);
    gsap.to(allRef.current.slice(0, index), {
      duration: 0,
      translateY: "0",
      ease: "circ.out",
    });
    editingRef.current.remove()
    
    
    setCurrentEditingId(null)
    setDescription('')
    setAmount(0)
    setEditingRef(null)
    setIsEditing(false)
    setIsLoading(false)
  };

  //This will cancel the current editing
  const cancelEditing = () => {
    gsap.to(editingRef.current, {
      duration: 0.5,
      translateX: "0",
      autoAlpha: 1,
    });
    gsap.to(allRef.current, { duration: 0, pointerEvents: "all" });

    const index = allRef.current.indexOf(editingRef.current);
    gsap.to(allRef.current.slice(0, index), {
      duration: 0.5,
      translateY: "0",
      ease: "circ.out",
    });
    setIsEditing(false)
    setDescription('')
    setAmount(0)
    setEditingRef(null)
  };

  // Refs to animate components after loading
  const InfoRef = useRef<HTMLDivElement>(null);
  const TransactionHistoryRef = useRef<HTMLDivElement>(null);

  // Use Effect to animate components
  useEffect(() => {
    gsap.from(InfoRef.current, {
      duration: 2,
      autoAlpha: 0,
      translateX: "-25%",
      ease: "circ.out",
    });
    gsap.from(TransactionHistoryRef.current, {
      duration: 2,
      autoAlpha: 0,
      translateY: "25%",
      ease: "circ.out",
    });
  }, []);

  return (
    <div className="Home">
      <Grid
        className={classes.root}
        container
        alignItems="flex-start"
        justify="space-around"
      >
        <Grid container item className="balance-container" xs={12} lg={7} justify='center'>
          <Info
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            value={value}
            setValue={setValue}
            description={description}
            setDescription={setDescription}
            amount={amount}
            cancelEditing={cancelEditing}
            setAmount={setAmount}
            handleEditButton={handleEditButton}
            InfoRef={InfoRef}
            allRef={allRef}
          />
        </Grid>
        <Grid container item xs={12} lg={5} justify='center'>
          <TransactionHistory
            addToRef={addToRef}
            handleDelete={handleDelete}
            handleEditIcon={handleEditIcon}
            TransactionHistoryRef={TransactionHistoryRef}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
