import React from 'react';
import { render } from 'react-dom';
import styles from './index.scss';
import classNames from 'classnames/bind';
import Spinner from './spinner';

let cx = classNames.bind(styles);

let submitClass = cx({
  twelve: true,
  columns: true,
  center: true,
  'run-experiment': true
});

let compareColumn = cx({
  six: true,
  columns: true,
  center: true
});

let titleClass = cx({
  center: true
});

class App extends React.Component {
  constructor() {
    super();
    this.types = {
      'Int8Array': {
        fn: Int8Array,
        max: 127,
        min: -128
      },
      'Uint8Array': {
        fn: Uint8Array,
        max: 255,
        min: 0
      },
      'Uint8ClampedArray': {
        fn: Uint8ClampedArray,
        max: 255,
        min: 0
      },
      'Int16Array': {
        fn: Int16Array,
        max: Math.pow(2, 15) - 1,
        min: -Math.pow(2, 15)
      },
      'Uint16Array': {
        fn: Uint16Array,
        max: Math.pow(2, 16) - 1,
        min: 0
      },
      'Int32Array': {
        fn: Int32Array,
        max: Math.pow(2, 31) - 1,
        min: -Math.pow(2, 31)
      },
      'Uint32Array': {
        fn: Uint32Array,
        max: Math.pow(2, 32) - 1,
        min: 0
      },
      'Float32Array': {
        fn: Float32Array,
        max: Math.pow(2, 31) - 1,
        min: -Math.pow(2, 31)
      },
      'Float64Array': {
        fn: Float64Array,
        max: Math.pow(2, 63) - 1,
        min: -Math.pow(2, 63)
      }
    };

    this.methods = {
      sort: {
        fn: this.sort
      },
      read: {
        fn: this.read
      },
      clone: {
        fn: this.clone
      },
      write: {
        fn: this.write
      }
    };

    this.state = {
      type: 'Int32Array',
      method: 'sort',
      count: 100000,
      running: false,
      results: {
        typed: null,
        normal: null
      }
    };
  }

  onSelectMethod(e) {
    this.abortExperiment();

    this.setState({
      method: e.target.value
    });
  }

  onSelectType(e) {
    this.abortExperiment();

    this.setState({
      type: e.target.value
    });
  }

  onSetCount(e) {
    this.abortExperiment();

    this.setState({
      count: e.target.value
    });
  }

  abortExperiment() {
    if (this.suite) {
      this.suite.abort();
    }

    this.setState({
      running: false
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateRandomArray(amount, min, max) {
    var randArray = [];
    for (var i=0; i < amount; i++) {
      randArray.push(this.getRandomInt(min, max));
    }

    return randArray;
  }

  sort(arr) {
    arr.sort((a, b) => {
      return a > b;
    });
  }

  clone(arr) {
    arr.slice();
  }

  read(arr) {
    var read = arr[this.state.count / 2];
  }

  write(arr) {
    // Hack because TypedArrays disobey LSP and do not implement the Array interface methods
    if (arr instanceof Array) {
      arr.push(1);
    }
    else {
      arr.set([1], arr.length - 1);
    }
  }

  runExperiment(e) {
    e.stopPropagation();
    e.preventDefault();

    this.normalArr = this.generateRandomArray(this.state.count, this.types[this.state.type].min, this.types[this.state.type].max);
    this.typedArr = new this.types[this.state.type].fn(this.normalArr);

    this.abortExperiment();

    this.suite = new Benchmark.Suite;

    this.suite.add('normal', () => {
      this.methods[this.state.method].fn.call(this, this.normalArr);
    })
    .add('typed', () => {
      this.methods[this.state.method].fn.call(this, this.typedArr);
    })
    .on('cycle', (event) => {
      console.log(String(event.target));
    })
    .on('complete', () => {
      this.setState({
        running: false
      });
    })
    .run({ 'async': true });

    this.setState({
      running: true
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className={titleClass}>JavaScript TypedArray Performance</h2>
        </div>
        <form>
         <div className="row">
            <div className="four columns">
              <label htmlFor="countInput"># of Random Array Elements</label>
              <input className="u-full-width"
                type="number"
                min="1"
                max="1000000"
                value={this.state.count}
                onChange={this.onSetCount.bind(this)}
                id="countInput"/>
            </div>
            <div className="four columns">
              <label htmlFor="arraySelector">TypedArray</label>
              <select className="u-full-width"
                id="typeSelector"
                onChange={this.onSelectType.bind(this)}
                value={this.state.type}>
                <option value="Int8Array">Int8Array</option>
                <option value="Uint8Array">Uint8Array</option>
                <option value="Uint8ClampedArray">Uint8ClampedArray</option>
                <option value="Int16Array">Int16Array</option>
                <option value="Uint16Array">Uint16Array</option>
                <option value="Int32Array">Int32Array</option>
                <option value="Uint32Array">Uint32Array</option>
                <option value="Float32Array">Float32Array</option>
                <option value="Float64Array">Float64Array</option>
              </select>
            </div>
            <div className="four columns">
              <label htmlFor="arraySelector">Method</label>
              <select className="u-full-width" id="methodSelector"
                onChange={this.onSelectMethod.bind(this)}
                value={this.state.method}>
                <option value="sort">Sorting</option>
                <option value="read">Reading</option>
                <option value="write">Writing</option>
                <option value="clone">Cloning</option>
              </select>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className={compareColumn}>
              <h3>{this.state.type}</h3>
              {this.state.running ? <Spinner/> : "Press submit to see results..." }
            </div>
            <div className={compareColumn}>
              <h3>Normal Array</h3>
              {this.state.running ? <Spinner/> : "Press submit to see results..." }

            </div>
            <div className={submitClass}>
              <input className="button-primary" onClick={this.runExperiment.bind(this)} type="submit" value="Submit"/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

render(<App/>, document.querySelector("#app"));
