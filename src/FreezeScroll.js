import React from 'react';
import { stopEvent } from './utils';

class FreezeScroll extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      slideDis: 0,
      duration: 0,
    };
    this.moveHandler = this.moveHandler.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.getCont = this.getCont.bind(this);
    this.startHandler = this.startHandler.bind(this);
  }

  componentDidMount() {
    this.container = this.cont.current;
    this.container.addEventListener('touchstart', this.startHandler);
    this.container.addEventListener('touchmove', this.moveHandler,);
    this.container.addEventListener('touchend', this.endHandler);
  }

  componentWillUnmount() {
    this.container.removeEventListener('touchstart', this.startHandler);
    this.container.removeEventListener('touchmove', this.moveHandler);
    this.container.removeEventListener('touchend', this.endHandler);
  }

  getCont(node) {
    this.cont = node;
  }

  startHandler(e) {
    this.startY = e.touches[0].clientY;
    this.startX = e.touches[0].clientX;
    this.setState({ duration: 0 });
  }

  moveHandler(e) {
    const dy = e.touches[0].clientY - this.startY;
    const dx = e.touches[0].clientX - this.startX;
    const scrollTop = this.container.scrollTop;
    const offsetHeight = this.container.offsetHeight;
    const scrollHeight = this.container.scrollHeight;
    const isVertical = Math.abs(dx) < Math.abs(dy);
    if (!isVertical) {
      return;
    }
    if ((scrollTop <= 0 && dy > 0) || (scrollTop + offsetHeight >= scrollHeight && dy < 0)) {
      this.setState({ slideDis: dy / 3 });
      return stopEvent(e);
    }
    e.stopPropagation();
  }

  endHandler(e) {
    this.setState({ slideDis: 0, duration: 600 });
  }

  render() {
    return (
      <div ref={this.getCont}>
        <div style={{
          transform: `translate(0px,${this.state.slideDis}px)`,
          transitionDuration: `${this.state.duration}ms`
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default FreezeScroll;