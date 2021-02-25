import { configure, shallow } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';
import React from 'react';

configure({ adapter: new Adapter() });

describe('<NavigationItem />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    const wraper = shallow(<NavigationItems />);
    expect(wraper.find(NavigationItem)).toHaveLength(2);
  });
});
