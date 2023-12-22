

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operators = [ '/', '*', '-', '+'];
const ids = {
  7: 'seven', 
  8: 'eight', 
  9: 'nine', 
  4: 'four', 
  5: 'five', 
  6: 'six', 
  1: 'one', 
  2: 'two', 
  3: 'three', 
  0: 'zero',
  '/': 'divide', 
  '*': 'multiply', 
  '-': 'subtract', 
  '+': 'add'
}


class App extends React.Component {
  state = {
    lastClicked: undefined,
    calcResult: '0',
    operation: undefined
  }
  
  
  handleClick = (event) => {
    const { calcResult, lastClicked } = this.state;
    const { innerText } = event.target;
    
    switch(innerText) {
      case 'AC': {
        this.setState({
          calcResult: '0',
        });
        break;
      }
        
      case '=': {
        const evaluatedResult = eval(calcResult);
        this.setState({
          calcResult: evaluatedResult
        });
        break;
      }
        
      case '.': {
        
        const splittedResult = calcResult.split(/[\+\-\*\/]/);
        const lastResult = splittedResult.slice(-1)[0];
        
        if(!lastResult.includes('.')) {
          this.setState({
            calcResult: calcResult+'.'
          })
        }
        
        break;
      }
        
      default: {
        let event = undefined;
        // check for other op
      if(operators.includes(innerText)) {
          if(operators.includes(lastClicked) && innerText !== '-') {
            
            const lastNumberIdx = calcResult.split('').reverse()
                .findIndex(char => char !== ' ' && numbers.includes(+char)); 
            
        event = calcResult.slice(0, calcResult.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            event = `${calcResult} ${innerText} `;
          }
        } else {
          event = (calcResult === '0') ? innerText : (calcResult + innerText);
        }
        
        this.setState({
          calcResult: event
        });
      }
    }
    
    this.setState({
      lastClicked: innerText
    })
    
  }
  
  render() {
    const { currentNumber, calcResult } = this.state;
    return (
      <div className="calculator">        
        <div id="display" className="display">
          {calcResult}
        </div>
        
        <div className="numbers-container">
          <button 
           className="ac" /*black ac */
            onClick={this.handleClick} 
            id="clear"
            >
            AC
          </button>
          
          {numbers.map(number => (
            <button 
             /* className={`black ${number === 0 && 'bg'}`} */
              key={number} 
              onClick={this.handleClick}
              id={ids[number]}
             >
             {number}
            </button>
          ))}
          
          <button 
           /* className="grey" */
            onClick={this.handleClick} 
            id="decimal"
           >
            .
          </button>
        </div>
        <div className="operators-container">
          {operators.map(operator => (
            <button 
              className="op" 
              key={operator} 
              onClick={this.handleClick}
              id={ids[operator]}
             >
              {operator}
            </button>
          ))}
          
          <button 
          /*  className="gray" */
            onClick={this.handleClick} 
            id="equals"
           >
            =
          </button>
        </div>
      </div>
    )

  }

}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

//ReactDOM.render(<App />, document.getElementById('app'));    
        
    


   
