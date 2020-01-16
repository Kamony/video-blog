import * as React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Hidden from "@material-ui/core/Hidden"
import { Link } from "./Link"
import { SectionLabel } from "./SectionLabel"

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(4),
    },
  },
  cardMedia: {
    width: 160,
  },
  section: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(2),
    backgroundColor: "green",
    height: "100%",
    "&>div": {
      transform: "rotate(-90deg)",
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(3),
    },
  },
}))

type Props = {
  post: {
    title: string
    date: string
    description: string
    image: string
    imageTitle: string
    path: string
    section: string
  }
}

export default function FeaturedPost(props: Props) {
  const classes = useStyles()
  const { post } = props

  return (
    <Grid item xs={12} md={6}>
      <Link to={props.post.path}>
        <CardActionArea>
          <Card className={classes.card}>
            <SectionLabel section={post.section} />
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {post.date}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={post.image}
                title={post.imageTitle}
              />
            </Hidden>
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  )
}
