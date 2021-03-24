import React, { useEffect, useRef } from "react";
import { Grid, Typography, Box, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { TransactionProp } from "../Types";
import gsap from "gsap";
import numberWithCommas from "../utils/format";

const Transaction: React.FC<TransactionProp> = ({
  addToRef,
  id,
  description,
  amount,
  income,
  handleDelete,
  handleEditIcon,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const xsdown = useMediaQuery(theme.breakpoints.down('xs'))
  useEffect(() => {
    addToRef(ref);
    gsap.from(ref.current, {
      duration: 0.5,
      autoAlpha: 0,
      translateX: "-100%",
      boxShadow: 0,
      ease: "circ.out",
    });
  }, []);
  return (
    <div ref={ref}>
      <Grid
        container
        item
        xs={12}
        component={Box}
        className={`transaction-div ${income ? "income" : "expense"}`}
      >
        <Grid item xs={6} sm={3}>
          <Typography>
            <b>$</b>
            {numberWithCommas(amount)}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={7}>
          <Typography align={xsdown ? "right" : "left"}>
            {description}
          </Typography>
        </Grid>
        <Grid container item xs={12} sm={2} justify='space-between'>
          <Grid item>
            <EditIcon
              cursor="pointer"
              onClick={() => {
                handleEditIcon(id, description, amount, income, ref);
              }}
            />
          </Grid>
          <Grid item>
            <DeleteIcon
              cursor="pointer"
              onClick={() => {
                handleDelete(id, ref);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Transaction;
