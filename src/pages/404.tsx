import * as React from "react"
import { Button, Container, Grid, Paper, Typography } from "@material-ui/core"
import { Link } from "../components/Link"
import { NotListedLocationTwoTone } from "@material-ui/icons"

export default () => {
  return (
    <Container fixed style={{ height: "70vh" }}>
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant={"h1"} color={"primary"}>
            4
          </Typography>
          <Typography variant={"h1"} color={"secondary"}>
            0
          </Typography>
          <Typography variant={"h1"} color={"primary"}>
            4
          </Typography>
        </Grid>
        <Typography gutterBottom>
          <NotListedLocationTwoTone color={"secondary"} fontSize={"large"} />
          Seems that you are lost
          <NotListedLocationTwoTone color={"secondary"} fontSize={"large"} />
        </Typography>
        <Link to={"/"}>
          <Button size={"large"} variant={"contained"} color={"primary"}>
            Home
          </Button>
        </Link>
      </Paper>
    </Container>
  )
}
