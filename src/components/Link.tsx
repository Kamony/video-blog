import * as React from "react"
import { Link as GatsbyLink } from "gatsby"

type Props = {
  children: React.ReactNode
  to: string
  style?: any
}

export const Link = (props: Props) => (
  <GatsbyLink style={{ textDecoration: "none", ...props.style }} to={props.to}>
    {props.children}
  </GatsbyLink>
)
