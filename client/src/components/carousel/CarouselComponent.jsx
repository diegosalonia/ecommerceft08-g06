import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "./../../redux/productListReducer/actions";
import Carousel from "react-material-ui-carousel";
import { Container, makeStyles } from "@material-ui/core";
import ProductCard from "../product/ProductCard";
import theme from "../../theme";

const useStyle = makeStyles((theme) => ({
  Carousel: {
    width: '298px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
    marginBottom: '5%'
  },
  CarouselItem: {
    width: '298px',
    transition: '4000ms'
  }
}));
const CarouselComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productListReducer.products);
  const style = useStyle();
  const productWithDiscount = products.filter((e) => e.discount > 0)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container className={style.container} >
      <Carousel className={style.Carousel} indicators={false} interval={5000} >
        {productWithDiscount.slice(0,2)
          .map((product, i) => (
            <ProductCard key={i} productProps={product} />
          ))}
      </Carousel>
      <Carousel className={style.Carousel} indicators={false} interval={5000}>
        {productWithDiscount.slice(2,4)
          .map((product, i) => (
            <ProductCard key={i} productProps={product} />
          ))}
      </Carousel>
      <Carousel className={style.Carousel} indicators={false} interval={5000}>
        {productWithDiscount.slice(4,6)
          .map((product, i) => (
            <ProductCard key={i} productProps={product} />
          ))}
      </Carousel>
    </Container>
  );
};

export { CarouselComponent as default };

// import { Grid } from "@material-ui/core";
// import React, { useEffect, useRef, useReducer } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from './../../redux/productListReducer/actions';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import hierva2 from "../../assets/hierva1.jpg";
// import hierva3 from "../../assets/hierva2.jpg";
// import hierva1 from "../../assets/hierva3.jpg";
// //import { useStylesCarousel } from "./styles/carousel";
// import './styles/prueba1.css';

// const CarouselComponent = () => {
//   const dispatche = useDispatch();
//   const products = useSelector(state => state.productListReducer.products);
//   console.log(products);
//   const slides = [
//     {
//       title: "hierva1",
//       subtitle: "hierva1",
//       description: "hierva1",
//       image: hierva1,
//     },
//     {
//       title: "hierva2",
//       subtitle: "hierva2",
//       description: "hierva2",
//       image: hierva2,
//     },
//     {
//       title: "hierva3",
//       subtitle: "hierva3",
//       description: "hierva3",
//       image: hierva3,
//     },
//   ];

//   useEffect(() => {
//     dispatche(getProducts())
//   }, [dispatche])

//   function useTilt(active) {
//     const ref = useRef(null);

//     useEffect(() => {
//       if (!ref.current || !active) {
//         return;
//       }

//       const state = {
//         rect: undefined,
//         mouseX: undefined,
//         mouseY: undefined,
//       };

//       let el = ref.current;

//       const handleMouseMove = (e) => {
//         if (!el) {
//           return;
//         }
//         if (!state.rect) {
//           state.rect = el.getBoundingClientRect();
//         }
//         state.mouseX = e.clientX;
//         state.mouseY = e.clientY;
//         const px = (state.mouseX - state.rect.left) / state.rect.width;
//         const py = (state.mouseY - state.rect.top) / state.rect.height;

//         el.style.setProperty("--px", px);
//         el.style.setProperty("--py", py);
//       };

//       el.addEventListener("mousemove", handleMouseMove);

//       return () => {
//         el.removeEventListener("mousemove", handleMouseMove);
//       };
//     }, [active]);

//     return ref;
//   }

//   const initialState = {
//     slideIndex: 0,
//   };

//   const slidesReducer = (state, event) => {
//     if (event.type === "NEXT") {
//       return {
//         ...state,
//         slideIndex: (state.slideIndex + 1) % slides.length,
//       };
//     }
//     if (event.type === "PREV") {
//       return {
//         ...state,
//         slideIndex:
//           state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
//       };
//     }
//   };

//   function Slide({ slide, offset }) {
//     const active = offset === 3 ? true : null;
//     const ref = useTilt(active);

//     return (
//       <div
//         ref={ref}
//         className="slide"
//         data-active={active}
//         style={{
//           "--offset": offset,
//           "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
//         }}
//       >
//         <Grid>
//           <div
//             className="slideBackground"
//             style={{
//               backgroundImage: `url('${slide.image}')`,
//             }}
//           />
//           <div
//             className="slideContent"
//             style={{
//               backgroundImage: `url('${slide.image}')`,
//             }}
//           >
//             <div className="slideContentInner">
//               <h2 className="slideTitle">{slide.title}</h2>
//               <h3 className="slideSubtitle">{slide.subtitle}</h3>
//               <div img={slide.image}></div>
//               <p className="slideDescription">{slide.description}</p>
//             </div>
//           </div>
//         </Grid>
//       </div>
//     );
//   }

//   const [state, dispatch] = useReducer(slidesReducer, initialState);

//   return (
//     <div className="slides">
//       <button onClick={() => dispatch({ type: "PREV" })}>‹</button>

//       {[...slides, ...slides, ...slides].map((slide, i) => {
//         let offset = slides.length + (state.slideIndex - i);
//         return <Slide slide={slide} offset={offset} key={i} />;
//       })}
//       <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
//     </div>
//   );
// };

// export { CarouselComponent as default };
