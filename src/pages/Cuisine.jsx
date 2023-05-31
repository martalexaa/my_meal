import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled(motion.div)`
  img {
    border-radius: 2rem;
    width: 100%;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [error, setError] = useState(null);
  let params = useParams();

  const getCuisine = async (name) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);

      if (!response.ok) {
        // Check for error status codes
        throw new Error(`Request failed with status ${response.status}`);
      }

      const recipes = await response.json();
      setCuisine(recipes.results);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  if (error) {
    return <p>An error occurred: {error}</p>;
  }

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <img src={item.image} alt=""></img>
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

export default Cuisine;
