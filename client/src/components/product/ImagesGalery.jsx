import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { useStylesImageGalery } from './styles';

const ImagesGalery = ({ images }) => {
    const styles = useStylesImageGalery();
    const [ biggerImage, setBiggerImage ] = useState(images[0]);


    return (
        <Container className={styles.imageContainer} >
            <Container className={styles.thumbContainer} >
                { images.map(image => <img key={image} src={image} alt={image} />)}
            </Container>
            <Container>
                <img src={biggerImage} alt={biggerImage} />
            </Container>
        </Container>
    );
};

export default ImagesGalery;
