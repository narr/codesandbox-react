import { createContext, Component, PureComponent } from "react";

const ThemeContext = createContext("red");

class ClassComponent extends Component {
  static contextType = ThemeContext;

  // only for undefined
  // static defaultProps = {
  //   color: 'blue'
  // };

  // constructor(props) {
  //   super(props);
  //   this.state = { hasError: false };
  //    this.handleOnClick = this.handleOnClick.bind(this);
  // }

  state = {
    count: 0,
    count2: {
      value: 0,
    },
  };

  // need to bind this
  // handleOnClick(e) {
  //   this.setState({
  //     count: this.state.count + 1,
  //   });
  // }

  handleOnClick = (e) => {
    this.setState({
      count: this.state.count + 1,
    });
    // this.setState(prevState => {
    //   return {
    //     count: prevState.count + 1,
    //   };
    // });
  };

  handleOnClick2 = (e) => {
    // this.setState(); // no re-render
    // this.setState(null); // no re-render
    // this.setState(undefined); // no re-render
    //
    // this.setState({}); // render but no update
    // this.setState(this.state); // render but no update
    //
    // @ render and update
    const count2 = this.state.count2;
    count2.value = count2.value + 1;
    this.setState({ count2 });
    // render and update @
  };

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState)
  // static getDerivedStateFromProps(props, state)
  // static getDerivedStateFromError(error) {]}

  render() {
    console.log("ClassComponent counts", this.state);
    console.log("ClassComponent context", this.context);
    return (
      <>
        prop "name": {this.props.name}
        <br />
        <button onClick={this.handleOnClick}>update state count</button>
        <br />
        state "count": {this.state.count}
        <br />
        <button onClick={this.handleOnClick2}>update state count2</button>
        <br />
        state "count2": {this.state.count2.value}
      </>
    );
  }
}

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ClassComponent name="test" />
    </ThemeContext.Provider>
  );
}
