import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationControlled = (props) => {

  const totalProducts = useSelector(state => state.catalogReducer.totalProducts);
  const pageSize = useSelector(state => state.catalogReducer.pageSize);
  var totalPages = Math.ceil(totalProducts / pageSize);
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    props.setpage(value);
  };

  return (
    <div className={classes.root}>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </div>
  );
}

export default PaginationControlled;