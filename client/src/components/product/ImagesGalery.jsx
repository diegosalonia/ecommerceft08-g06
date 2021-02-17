import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { useStylesImageGalery } from './styles';
import ReactImageMagnify from 'react-image-magnify';

const ImagesGalery = ({ images }) => {
    const styles = useStylesImageGalery();
    const [ biggerImage, setBiggerImage ] = useState(images[0]);


    return (
        <Container className={styles.imageContainer} >
            <Container className={styles.thumbContainer} >
                { images.map(image => (
                    <Container key={image} className={styles.image} onClick={() => setBiggerImage(image)} >
                        <img className={styles.img} src={image} alt={image} />
                    </Container>
                ))}
            </Container>
            <ReactImageMagnify {...{
                        smallImage: {
                            src: biggerImage,
                            alt: 'biggerImage',
                            isFluidWidth: true,
                        },
                        largeImage: {
                            src: biggerImage,
                            width: 1200,
                            height: 1800
                        },
                        enlargedImageContainerStyle: {zIndex: 10000},
                        enlargedImageContainerDimensions: {
                            width: '125%',
                            height: '100%'
                        },
                        enlargedImagePosition: 'over',
                    }} 
            />
        </Container>
    );
};

export default ImagesGalery;
