import './App.css';
import { useCallback, useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('No data from server!');
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  const handleGreetingClick = useCallback(() => {
    setLoading(true);
    setError(undefined);

    fetch('/api/hello/')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setGreeting(data);
          setLoading(false);
        }, 1000);
      }).catch(err => {
        setLoading(false);
        setError('Backend API error');
      })
  }, []);

  const [byeBye, setByeBye] = useState('No data from server!');
  const [byeByeError, setByeByeError] = useState();
  const [isByeByeLoading, setByeByeLoading] = useState(false);

  const handleByeByeClick = useCallback(() => {
    setByeByeLoading(true);
    setByeByeError(undefined);

    fetch('/api/bye-bye/')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setByeBye(data);
          setByeByeLoading(false);
        }, 1000);
      }).catch(err => {
        setByeByeLoading(false);
        setByeByeError('Backend API error');
      })
  }, []);

  const text = isLoading ? 'The greeting is loading...' : (error || greeting);
  const byeByeText = isByeByeLoading ? 'The bye-bye is loading...' : (byeByeError || byeBye);

  const greetingClassName = (() => {
    if (error) {
      return 'failure';
    }

    if (greeting) {
      return 'success';
    }

    return '';
  })();

  const byeByeClassName = (() => {
    if (error) {
      return 'failure';
    }

    if (greeting) {
      return 'success';
    }

    return '';
  })();

  return (
    <div className="App">
      <button onClick={handleGreetingClick}>Request the greeting from server</button>
      <h1 className={greetingClassName}>{text}</h1>

      <button onClick={handleByeByeClick}>Request the bye-bye from server</button>
      <h1 className={byeByeClassName}>{byeByeText}</h1>
    </div>
  );
}

export default App;
