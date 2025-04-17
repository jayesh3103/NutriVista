import React, { useContext, useRef, useEffect } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);
  const menuSectionsRef = useRef({});

  // Create refs for each menu section for scrolling
  useEffect(() => {
    // Reset refs object
    menuSectionsRef.current = {};

    // Create a ref for each menu item
    menu_list.forEach(item => {
      menuSectionsRef.current[item.menu_name] = React.createRef();
    });
  }, [menu_list]);

  // Scroll to category when category changes
  useEffect(() => {
    if (category !== "All" && menuSectionsRef.current[category]?.current) {
      menuSectionsRef.current[category].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [category]);
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div 
              ref={menuSectionsRef.current[item.menu_name]}
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              key={index} 
              className='explore-menu-list-item'
              id={`${item.menu_name.toLowerCase()}-section`}
            >
              <img 
                src={item.menu_image} 
                className={category === item.menu_name ? "active" : ""} 
                alt={item.menu_name} 
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;