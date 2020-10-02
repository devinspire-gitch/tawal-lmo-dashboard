import React, { Component } from "react";
import ReactDOM from "react-dom";
import {themeColorStorageKey} from "../../constants/defaultValues"


class ColorSwitcher extends Component {
  constructor(props) {
    super();

    this.state = {
      isOpen: false,
      selectedColor: localStorage.getItem(themeColorStorageKey)
    };
  }

  getContainer = () => {
    return ReactDOM.findDOMNode(this);
  };

  toggle = e => {
    e.preventDefault();
    const isOpen = this.state.isOpen;
    if (!isOpen) {
      this.addEvents();
    } else {
      this.removeEvents();
    }
    this.setState({
      isOpen: !isOpen
    });
  };
  changeThemeColor = (e, color) => {
    e.preventDefault();
    localStorage.setItem(themeColorStorageKey, color);
    this.toggle(e);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  componentWillMount() {
    this.removeEvents();
  }

  addEvents = () => {
    ["click", "touchstart"].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };
  removeEvents = () => {
    ["click", "touchstart"].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  handleDocumentClick = e => {
    const container = this.getContainer();
    if (container.contains(e.target) || container === e.target) {
      return;
    }
    this.toggle(e);
  };

  render() {
    const selectedColor = this.state.selectedColor;
    return (
      <div className={`theme-colors ${this.state.isOpen ? "shown" : ""}`}>
        <div className="p-4">
          <p className="text-muted mb-2">Light Theme</p>
          <div className="d-flex flex-row justify-content-between mb-4">
            <a
              href="#light.purple"
              className={`theme-color theme-color-purple ${
                selectedColor === "light.purple" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "light.purple")}
            >
              <span>light.purple</span>
            </a>
            <a
              href="#light.blue"
              className={`theme-color theme-color-blue ${
                selectedColor === "light.blue" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "light.blue")}
            >
              <span>light.blue</span>
            </a>
            <a
              href="#light.green"
              className={`theme-color theme-color-green ${
                selectedColor === "light.green" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "light.green")}
            >
              <span>light.green</span>
            </a>
            <a
              href="#light.orange"
              className={`theme-color theme-color-orange ${
                selectedColor === "light.orange" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "light.orange")}
            >
              <span>light.orange</span>
            </a>
            <a
              href="#light.red"
              className={`theme-color theme-color-red ${
                selectedColor === "light.red" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "light.red")}
            >
              <span>light.red</span>
            </a>
          </div>
          <p className="text-muted mb-2">Dark Theme</p>
          <div className="d-flex flex-row justify-content-between">
            <a
              href="#dark.purple"
              className={`theme-color theme-color-purple ${
                selectedColor === "dark.purple" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "dark.purple")}
            >
              <span>dark.purple</span>
            </a>
            <a
              href="#dark.blue"
              className={`theme-color theme-color-blue ${
                selectedColor === "dark.blue" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "dark.blue")}
            >
              <span>dark.blue</span>
            </a>
            <a
              href="#dark.green"
              className={`theme-color theme-color-green ${
                selectedColor === "dark.green" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "dark.green")}
            >
              <span>dark.green</span>
            </a>
            <a
              href="#dark.orange"
              className={`theme-color theme-color-orange ${
                selectedColor === "dark.orange" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "dark.orange")}
            >
              <span>dark.orange</span>
            </a>
            <a
              href="#dark.red"
              className={`theme-color theme-color-red ${
                selectedColor === "dark.red" ? "active" : ""
              }`}
              onClick={e => this.changeThemeColor(e, "dark.red")}
            >
              <span>dark.red</span>
            </a>
          </div>
        </div>
        <a href="#section" className="theme-button" onClick={this.toggle}>
          {" "}
          <i className="simple-icon-magic-wand" />{" "}
        </a>
      </div>
    );
  }
}

export default ColorSwitcher;
