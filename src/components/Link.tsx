import * as React from "react"
import { Link as GatsbyLink } from "gatsby"

type Props = {
  children: React.ReactNode
  to: string
}

export const Link = (props: Props) => (
  <GatsbyLink style={{ textDecoration: "none" }} to={props.to}>
    {props.children}
  </GatsbyLink>
)
