'use client'

import Container from "../Container";
import CategoryBox from "../CategoryBox"

import { TbMountain } from 'react-icons/tb';
import { GiEarthAmerica } from 'react-icons/gi';
import { GiHighGrass } from 'react-icons/gi';
import { GiFarmTractor } from 'react-icons/gi';
import { MdFlood } from 'react-icons/md';
import { BsFillHouseCheckFill } from 'react-icons/bs';
import { BiBuildingHouse } from 'react-icons/bi';


export const categories = [
    
    {
      label: 'Countryside',
      icon: TbMountain,
      description: 'This property is in the countryside!'
    },
    {
      label: 'Oconus',
      icon: GiEarthAmerica,
      description: 'This property is located outside the continental US!'
    },
    {
      label: 'Rural',
      icon: GiHighGrass,
      description: 'This property is rural!'
    },
    {
      label: 'Agricultural',
      icon: GiFarmTractor,
      description: 'This property agricultural!'
    },
    {
      label: 'Flood Plain',
      icon: MdFlood,
      description: 'This property is in a flood plain!'
    },
    {
      label: 'Residential',
      icon: BsFillHouseCheckFill,
      description: 'This property is zoned residential!'
    },
    {
      label: 'Commercial',
      icon: BiBuildingHouse,
      description: 'This property zoned commercial!'
    }
  ]
  

const Categories = () => {
    return (
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default Categories;