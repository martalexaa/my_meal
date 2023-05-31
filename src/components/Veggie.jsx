import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Veggie() {

    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
       getVeggie();
    }, []);

    const getVeggie = async () => {
//check if something is in the localstorage
        const check = localStorage.getItem('veggie');
//if yes, we don't fetch the data again
//if note, save the veggie recipes to the localstorage
        if(check){
            setVeggie(JSON.parse(check));
        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
            const data = await api.json();

            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setVeggie(data.recipes);
            console.log(data.recipes);
        }
    }


  return (
    <div>
                    <Wrapper>
                        <h3>Veggie Meals</h3>
                        <Splide options={{ 
                            perPage: 4,
                            arrows: true,
                            pagination: false,
                            drag: "free",
                            gap: "5rem"
                         }}>
                        {veggie.map((recipe) => {
                            return(
                                <SplideSlide key={recipe.id}>
                                  <Link to={'/recipe/' + recipe.id}>
                                    <Card>
                                      <p>{recipe.title}</p>
                                      <img src={recipe.image} alt={recipe.title}/>
                                      <Gradient />
                                    </Card>
                                  </Link>
                                </SplideSlide>
                            )
                        })}
                        </Splide>
                    </Wrapper> 
        </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0 rem;
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;


export default Veggie
