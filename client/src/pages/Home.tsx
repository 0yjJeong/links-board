import { Link } from 'react-router-dom';
import { Button, Text } from '../components';

export const HomePage = () => {
  return (
    <div className='Home'>
      <div className='Home__header'>
        <Text font='slogan' color='grey5' justify='center'>
          🗂
        </Text>
        <Text font='slogan' color='grey5' justify='center'>
          Links Board
        </Text>
        <Text font='subtitle' color='grey4' justify='center'>
          With the links board, it's easier to manage the list of links.
        </Text>
      </div>
      <div>
        <video src='example.mov' autoPlay muted loop />
        <div className='Home__body-bottom'>
          <p>Do you want to create a new board?</p>
          <Link to='/board' style={{ textDecoration: 'none' }}>
            <Button spacing='medium' series='quaternary'>
              Create board
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
