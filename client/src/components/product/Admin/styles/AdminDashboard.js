import { makeStyles } from '@material-ui/core';

export const useStylesDashboard = makeStyles(theme => ({
    container: {
        height: '61vh',
        paddingLeft: '0',
        maxWidth: '1220px',
    },
    gridContainer: {
        margin: '1% auto',
    },
    link: {
        textDecoration: 'none'
    },
    images: {
        height: '150px',
    },
    card: {
        transition: 'transform .5s',
        '&:hover': {
            transform: 'scale(1.1)',
        }
    },
    cardShadow: {
        boxShadow: '1px 5px 5px rgba(0, 0, 0, .5)',
    }
}))