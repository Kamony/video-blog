import * as React from "react"
import Grid from "@material-ui/core/Grid"
import { Chip } from "@material-ui/core"

type Props = {
  tags: string[]
  className?: string
  small?: boolean
}

export const TagsList: React.FC<Props> = (props: Props) => {
  return (
    <Grid container spacing={1} className={props.className}>
      {props.tags.map(tag => (
        <Grid item key={tag}>
          <Chip
            size={props.small ? "small" : "medium"}
            label={tag}
            color={"secondary"}
          />
        </Grid>
      ))}
    </Grid>
  )
}
