import AwesomeSlider from 'react-awesome-slider'
import withAutoPlay from 'react-awesome-slider/dist/autoplay'
import AwesomeSliderStyles from'react-awesome-slider/dist/styles.css?raw'
import 'react-awesome-slider/dist/captioned.css'

import Foto1 from './images/foto1.jpg'
import Foto2 from './images/foto2.jpg'
import Foto3 from './images/foto3.jpg'

const AutoPlaySlider = withAutoPlay(AwesomeSlider)


const Slider =() => {
    
    return (
        <AutoPlaySlider 
            cssModule={AwesomeSliderStyles}
            play={true}
            cancelOnInteraction={false}
            interval={3000}
             
        >
            <div data-src={Foto1} />
            <div data-src={Foto2}/>
            <div data-src={Foto3}/>

        </AutoPlaySlider>
  
    )

}
    
    

export default Slider