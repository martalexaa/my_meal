import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Detailwrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('instructions');

  const fetchDetails = useCallback(async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);

      if (!response.ok) {
        // Check for error status codes
        throw new Error(`Request failed with status ${response.status}`);
      }

      const detailData = await response.json();
      setDetails(detailData);
    } catch (error) {
      setError(error.message);
    }
  }, [params.name]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (error) {
    return <div>An error occurred: {error}</div>; // Handle error state
  }

  if (Object.keys(details).length === 0) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <Detailwrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt=""/>
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} 
        onClick={() => setActiveTab('instructions')}>Instructions
        </Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} 
        onClick={() => setActiveTab('ingredients')}>Ingredients
        </Button>
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => 
              <li key={ingredient.id}>{ingredient.original}</li>
            )}
          </ul>
        )}
      </Info>
    </Detailwrapper>
  );
}

export default Recipe;