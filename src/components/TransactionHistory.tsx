import React from "react";
//Styles
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
//Types
import { TransactionHistoryProp, RootState, TransactionType } from "../Types";
import Transaction from "./Transaction";
import { useSelector } from "react-redux";

const TransactionHistory: React.FC<TransactionHistoryProp> = ({
  addToRef,
  handleDelete,
  handleEditIcon,
  TransactionHistoryRef,
}) => {
  const transactions: TransactionType[] = useSelector(
    (state: RootState) => state.transactions
  );

  return (
    <>
      <Card className="transaction-history" ref={TransactionHistoryRef}>
        <CardContent>
          <Typography variant="h5">Transaction History</Typography>
          <Divider />

          <Grid
            container
            style={{ marginTop: 10, flexDirection: "column-reverse" }}
          >
            {transactions.map(({ _id, description, amount, income }) => {
              return (
                <Transaction
                  addToRef={addToRef}
                  key={_id}
                  id={_id}
                  description={description}
                  amount={amount}
                  income={income}
                  handleDelete={handleDelete}
                  handleEditIcon={handleEditIcon}
                />
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionHistory;
