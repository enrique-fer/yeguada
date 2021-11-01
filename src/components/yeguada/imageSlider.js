import React, { Component } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';

class ImageSlider extends Component  {
    constructor(props) {
        super(props);
    
        this.state = {
            current: 0,
            length: this.props.sliderData.length
        }

        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    nextSlide() {
        this.setState({
            current: this.state.current === this.state.length - 1 ? 0 : this.state.current + 1
        });
    }

    prevSlide() {
        this.setState({
            current: this.state.current === 0 ? this.state.length - 1 : this.state.current - 1
        })
    }



    render() {
        const { className, handleClick } = this.props;

        const prev = this.state.current === 0 ? this.state.length - 1 : this.state.current - 1;
        const next = this.state.current === this.state.length - 1 ? 0 : this.state.current + 1;

        return (
            <div className={`${className} slider`}>
                <div className="slider__left-arrow" onClick={this.nextSlide}>
                    <i className="fas fa-arrow-left"></i>
                </div>
                
                <div className="slider__right-arrow" onClick={this.prevSlide}>
                    <i className="fas fa-arrow-right"></i>
                </div>

                {
                    mapSliderData(this.props.sliderData, next, "next")
                }

                {
                    mapSliderData(this.props.sliderData, this.state.current, "active", handleClick)
                }

                {
                    mapSliderData(this.props.sliderData, prev, "prev")
                }
            </div>
        )
    }
}

function mapSliderData(sliderData, imgIndex, type, handleClick) {
    return (
        sliderData.map((slide, index) => {
            return (
                <div className={`slide ${index === imgIndex ? type : ''}`} key={index} onClick={() => handleClick(slide)} >
                    {
                        index === imgIndex && (
                            <div>
                                {
                                    type === 'active' ?
                                        <h1 className="slide__title">{slide.title}</h1> :
                                        ''
                                }
                                {
                                    slide.image ? 
                                        <CloudinaryContext className='item__foto' cloudName="djkulk2kk">
                                            <Image className="cab-image" publicId={slide.image} width="800px" height="450px" />
                                        </CloudinaryContext>  :
                                        <img className={`slide__${type}image`} src={`http://via.placeholder.com/800x480`} alt={slide.title} title="No hay foto para el caballo" />
                                }
                            </div>
                        )
                    }
                </div>
            )
        })
    )
}

export default ImageSlider;
