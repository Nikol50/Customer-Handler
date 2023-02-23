import React, { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      viewCompleted: false,
      activeItem: {
        id: "",
        first_name: "",
        last_name: "",
        address: "",
        phone: "",
        completed: false
      },
    };
  }

    async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/workers/');
        console.log('res: ' + res);
        const workers = await res.json();
        console.log('workers: ' + JSON.stringify(workers, null, 2));
        this.setState({
          workers
        });
      } catch (e) {
        console.log(e);
      }
    }

    renderItems = () => {
      const { viewCompleted } = this.state;
      console.log('eeee1');
      console.log('rrr2: ' + JSON.stringify(this.state.workers, null, 2));
      return this.state.workers.map(item => (
        <li 
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span 
            className={`todo-title mr-2 ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.first_name}
            >
              {item.first_name} - {item.last_name}
            </span>
        </li>
      ));
    };

    render() {
      return (
        <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
      )
    }
  }
  
export default App;
