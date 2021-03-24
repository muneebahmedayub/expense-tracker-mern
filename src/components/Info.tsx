import React, { useState } from "react";
//Styles
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { InfoProp, RootState, TransactionType } from "../Types";
import { useTheme } from '@material-ui/core/styles'

import gsap from "gsap";

import numberWithCommas from "../utils/format";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../redux/actions/transactionActions";
import dayjs from "dayjs";

const useStyles = makeStyles({
  root: {
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    borderRadius: "3px 3px 0px 0px",
  },
});

const Info: React.FC<InfoProp> = ({
  isEditing,
  setIsEditing,
  value,
  setValue,
  description,
  setDescription,
  amount,
  setAmount,
  cancelEditing,
  handleEditButton,
  InfoRef,
  allRef,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme()
  // const xsdown = useMediaQuery('@media (max-width: 400px)')
  const xsdown = useMediaQuery(theme.breakpoints.down('xs'))

  console.log(theme.breakpoints.down('xs'))

  const transactions: TransactionType[] = useSelector(
    (state: RootState) => state.transactions
  );
  const username = useSelector((state: RootState) => state.auth.user.username)

  const [descErr, setDescErr] = useState<boolean>(false);
  const [amtErr, setAmtErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const incomeObj = transactions.filter((obj) => {
    return obj.income === true;
  });
  const incomeAmounts = incomeObj.map((obj) => {
    return obj.amount;
  });
  const income = incomeAmounts.reduce((acc, item) => acc + item, 0);

  const expenseObj = transactions.filter((obj) => {
    return obj.income === false;
  });
  const expenseAmounts = expenseObj.map((obj) => {
    return obj.amount;
  });
  const expense = expenseAmounts.reduce((acc, item) => acc + item, 0);

  const total = parseFloat((income - expense).toFixed(2));

  const handleDescription = (e: React.ChangeEvent<{ value: string }>) => {
    setDescription(e.target.value);
  };

  const handleAmount = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleClick = () => {
    if (description && amount !== 0) {
      const addTransaction = async () => {
        setIsLoading(true);
        const now = dayjs().format();
        const trans = {
          description,
          amount,
          income: value ? false : true,
          updatedAt: now,
        };
        await dispatch(createTransaction(trans));
        setDescription("");
        setAmount(0);

        setDescErr(false);
        setAmtErr(false);
        setIsLoading(false);

        gsap.to(allRef.current, {
          duration: 0,
          translateY: "-100%",
          ease: "circ.out",
        });
        await gsap.to(allRef.current, {
          duration: 0.3,
          translateY: "0%",
          ease: "circ.out",
        });
      };
      addTransaction();
    } else {
      setDescErr(false);
      setAmtErr(false);
      if (!description) {
        setDescErr(true);
      }
      if (amount === 0) {
        setAmtErr(true);
      }
    }
  };

  return (
    <Card className="info" ref={InfoRef}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5' align='center'>{username}</Typography>
          </Grid> 
          <Grid item xs={12}>
            <Box className="current-balance" textAlign="center">
              <Typography variant="h4" gutterBottom>
                { xsdown ? 'Current Bal.' : 'Current Balance' }
              </Typography>
              <Typography variant="h5">${numberWithCommas(total)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="income-div" textAlign="center">
              <Typography variant="h4" gutterBottom>
                Income
              </Typography>
              <Typography variant="h5">${numberWithCommas(income)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="expense-div" textAlign="center">
              <Typography variant="h4" gutterBottom>
                Expense
              </Typography>
              <Typography variant="h5">${numberWithCommas(expense)}</Typography>
            </Box>
          </Grid>
        </Grid>
        <div className="new-transaction">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                  <Tab label="Income" />
                  <Tab label="Expense" />
                </Tabs>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.root}
                variant="filled"
                error={descErr}
                label="Description"
                value={description}
                onChange={handleDescription}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.root}
                variant="filled"
                error={amtErr}
                label="Amount"
                value={amount !== 0 ? amount : ""}
                type="number"
                onChange={handleAmount}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {isEditing ? (
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={
                    isLoading ? (
                      <CircularProgress color="secondary" size={20} />
                    ) : null
                  }
                    onClick={cancelEditing}
                  fullWidth
                >
                  Cancel Editing
                </Button>
              </Grid>
            ) : null}
            <Grid item xs={12} sm={isEditing ? 6 : 12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={
                  isLoading ? (
                    <CircularProgress color="secondary" size={20} />
                  ) : null
                }
                disabled={isLoading}
                onClick={() => isEditing ? handleEditButton(value, setIsLoading) : handleClick()}
                fullWidth
              >
                {!isEditing ? 'Add New Transaction' : 'Edit Transaction'}
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

export default Info;
