import * as React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { Box, Button } from "@material-ui/core"
import { Link } from "./Link"
import { TagsList } from "./TagsList"
import { SectionLabel } from "./SectionLabel"

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  tags: {
    paddingBottom: theme.spacing(2),
  },
  section: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(2),
    opacity: 0.8,
    backgroundColor: "green",
    height: "100%",
    "&>div": {
      transform: "rotate(-90deg)",
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(4),
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
    tags?: string[]
    path: string
    section: string
  }
}

export default function MainFeaturedPost(props: Props) {
  const classes = useStyles()
  const { post } = props

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${post.image})` }}
    >
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6} direction={"row"}>
          <SectionLabel section={post.section} />
          <div className={classes.mainFeaturedPostContent}>
            <Box px={0.5}>
              <Typography variant="subtitle1">{post.date}</Typography>
            </Box>
            <Typography component="h1" variant="h3" color="inherit">
              {post.title}
            </Typography>
            {props.post.tags && (
              <TagsList tags={props.post.tags} className={classes.tags} />
            )}
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Link to={props.post.path}>
              <Button variant={"contained"} color={"primary"}>
                Continue reading...
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}
