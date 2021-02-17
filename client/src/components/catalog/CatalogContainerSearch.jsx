import React, { useEffect } from 'react';
import CatalogFilterByKeyword from './CatalogFilterByKeyword';
import { useSelector } from 'react-redux';
import { Button, Container, Link, makeStyles, Typography } from '@material-ui/core';
import  FadeIn  from 'react-fade-in';

export default function CatalogContainerSearch (props){
    const search = useSelector(state => state.searchBarReducer.products)
    const keyword = useSelector(state => state.searchBarReducer.keyword)
    const styles = makeStyles(theme => ({
        button: {
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.main
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%'
        },
        link: {
            textDecoration: 'none'
        }
    }))

    useEffect(() => {
    }, [search])

    if(!keyword){
        return (
            <FadeIn transitionDuration={1000} >
                <Container className={styles().container} >
                    <Typography align='center' variant="h5">Digite algo en el cuadro de búsqueda</Typography>
                    <Button className={styles().button} href='/products' >Catalogo</Button>
                </Container>
            </FadeIn>
            )
    }
    if(!search.length){
        return(
            <FadeIn transitionDuration={1000} >
                <Container className={styles().container} >
                    <Typography align='center' variant="h5">No se encontraron productos con { keyword }</Typography>
                    <Button className={styles().button} href='/products' >Catalogo</Button>
                </Container>
            </FadeIn>
        )
    }
    return (
        <CatalogFilterByKeyword testlist={search}/>
    )
}

