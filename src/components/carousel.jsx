import { Component } from "react";
import PropTypes from "prop-types";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="primary animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={photo + index}
              src={photo}
              className={index === active ? "active" : ""}
              alt={`animal thumbnail ${index + 1}`}
              onClick={this.handleIndexClick}
              data-index={index}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  this.handleIndexClick({ target: { dataset: { index } } });
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default Carousel;
