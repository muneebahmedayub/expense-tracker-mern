import { Card, CardContent, CircularProgress } from "@material-ui/core";
import React from "react";

const Loader = () => {
  return (
    <div
      className="loader-div"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardContent>
          <CircularProgress size="15rem" thickness={4} color="secondary" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Loader;
