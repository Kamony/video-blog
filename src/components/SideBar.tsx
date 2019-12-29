import * as React from "react"
import { Grid, Link, makeStyles, Paper, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}))

type Props = {
  title: string
  description: string
  social: { name: string; icon: React.FC; href?: string }[]
}

export default function Sidebar(props: Props) {
  const classes = useStyles()
  const { description, title, social } = props

  return (
    <Grid item xs={12} md={4}>
      <Paper className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Follow Us!
      </Typography>
      {social.map(socialItem => (
        <Link
          display="block"
          variant="body1"
          href={socialItem.href || "#"}
          key={socialItem.name}
        >
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <socialItem.icon />
            </Grid>
            <Grid item>{socialItem.name}</Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  )
}
