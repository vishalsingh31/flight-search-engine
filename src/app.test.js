import React from 'react';
import { shallow } from 'enzyme';
import App from './app';

describe('Testing App component', () => {
   it('renders without crashing', () => {
      shallow(<App />);
    });
});
