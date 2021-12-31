import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { Button, Stack, Text } from '../components';

export const HomePage = () => {
  return (
    <Stack axis='column' justify='center' align='center' gap='large'>
      <div>
        <div className='Home__texts'>
          <Text font='slogan' color='grey5' justify='center'>
            Organize your links list on the board!
          </Text>
          <Text font='title2' color='grey4' justify='center'>
            With the links board, it's easier to manage the list of links.
          </Text>
        </div>
        <div className='home__checkbox'>
          <div className='home__checkbox-icon'>
            <FaCheck />
          </div>
          <div className='home__checkbox-cation'>Board format</div>
        </div>
        <div className='home__checkbox'>
          <div className='home__checkbox-icon'>
            <FaCheck />
          </div>
          <div className='home__checkbox-cation'>Share with other people</div>
        </div>
      </div>
      <Link to='/board' style={{ textDecoration: 'none' }}>
        <Button themeName='main' spacing='medium'>
          Create new board
        </Button>
      </Link>
    </Stack>
  );
};
