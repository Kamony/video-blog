import * as React from "react"
import Grid from "@material-ui/core/Grid"
import { Chip } from "@material-ui/core"

type Props = {
  tags: string[]
  className?: string
}

export const TagsList: React.FC<Props> = (props: Props) => {
  return (
    <Grid container spacing={1} className={props.className}>
      {props.tags.map(tag => (
        <Grid item>
          <Chip key={tag} label={tag} color={"secondary"} />
        </Grid>
      ))}
    </Grid>
  )
}
