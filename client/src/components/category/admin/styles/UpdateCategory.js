import { makeStyles } from '@material-ui/core';

export const useStylesUpdateCategory = makeStyles({
    form: {
        maxWidth: '40%',
        margin: 'auto',
    },
    imageContainer: {
        display: 'flex'
    },
    img: {
        maxWidth: '150px',
        maxHeight: '150px'
    },
    trash: {
        alignSelf: 'baseline',
        color: 'red',
    },
    isLoading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20% auto'
    },
    editButton: {
        marginTop: '6%'
    },
    imagesContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: '14% 0 14% 0',
    }
});

