import { Flex } from '@chakra-ui/react'
import React from 'react'

const SingleOldCar = () => {
    return (
        <div class="old__car-grid">
            <div class="old__car-image">
                <a class="image">
                    <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Tesla/Tesla-Model-3/5100/1558500541732/front-left-side-47.jpg?tr=w-456" alt="img" />
                </a>
                <ul class="old__car-links">
                    <li><div className='old__car__icons' ><i class="fa fa-search"></i></div></li>
                    <li><div className='old__car__icons' ><i class="fa fa-shopping-cart"></i></div></li>
                    <li><div className='old__car__icons' ><i class="fa fa-heart"></i></div></li>
                    <li><div className='old__car__icons' ><i class="fa fa-random"></i></div></li>
                </ul>
            </div>
            <div class="old__car-content">
                <h3 class="title">Women's Top</h3>
                <Flex>
                    <div class="price">$68.88</div>
                </Flex>
            </div>
        </div>
    )
}

export default SingleOldCar