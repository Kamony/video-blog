import * as React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Index } from "elasticlunr"
import {
  fade,
  IconButton,
  InputBase,
  makeStyles,
  Popover,
  Popper,
  Theme,
  Typography,
} from "@material-ui/core"
import { Search as SearchIcon, Close as CloseIcon } from "@material-ui/icons"
import { Link } from "./Link"

type Props = {
  searchIndex: any
}

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clearIcon: {
    height: "100%",
    pointerEvents: "none",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  searchResultContainer: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
  },
}))

const SearchDry = (props: Props) => {
  const [query, setQuery] = React.useState(``)
  const [results, setResults] = React.useState([])
  const [index, setIndex] = React.useState()
  const [searchBarVisible, setSearchBarVisible] = React.useState(false)
  const anchorEl = React.useRef(null)

  const classes = useStyles()

  React.useEffect(() => {
    setIndex(Index.load(props.searchIndex))
  }, [])

  React.useEffect(() => {
    setSearchBarVisible(results.length > 0)
  }, [results])

  const search = evt => {
    const query = evt.target.value
    setQuery(query)
    setResults(
      index.search(query, {}).map(({ ref }) => index.documentStore.getDoc(ref))
    )
  }
  const clearQuery = () => {
    setQuery(``)
    setResults([])
  }

  console.log("results: ", results)
  return (
    <div>
      <div className={classes.search} ref={anchorEl}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={query}
          onChange={search}
          inputProps={{ "aria-label": "search" }}
        />

        <IconButton
          type="submit"
          className={classes.clearIcon}
          disabled={query.length === 0}
          size={"small"}
          aria-label="clear"
          onClick={clearQuery}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <Popper
        open={searchBarVisible}
        anchorEl={anchorEl.current}
        placement="bottom"
        style={{ zIndex: 1050 }}
      >
        <div className={classes.searchResultContainer}>
          {results.map(result => (
            <Link to={result.path} key={result.id}>
              <Typography>{result.title}</Typography>
            </Link>
          ))}
        </div>
      </Popper>
    </div>
  )
}

export const Search = () => {
  return (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          siteSearchIndex {
            index
          }
        }
      `}
      render={data => {
        console.log(data)
        return <SearchDry searchIndex={data.siteSearchIndex.index} />
      }}
    />
  )
}
