
import './App.css';
import HomeWrapper from './components/HomeWrapper';
import sample from './bg_vid.mp4';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 className="hd-logo">VISIONCORS</h3>      
      </header>

      <main className="App-main">
        <HomeWrapper/>
      </main>
      <video className='videoTag' autoPlay loop muted>
    <source src={sample} type='video/mp4' />
      </video>
    </div>
  );
}
export default App;
