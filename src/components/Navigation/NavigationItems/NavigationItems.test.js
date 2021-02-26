import { configure, shallow } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';
import React from 'react';

configure({ adapter: new Adapter() });

describe('<NavigationItem />', () => {
  let wraper;
  beforeEach(() => {
    wraper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wraper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render two <NavigationItem /> elements if authenticated', () => {
    wraper.setProps({ isAuthenticated: true });
    expect(wraper.find(NavigationItem)).toHaveLength(3);
  });
});
