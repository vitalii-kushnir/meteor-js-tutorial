import {Meteor} from "meteor/meteor";
import React from "react";
import expect from "expect";
import {mount} from "enzyme";

import {PrivateHeader} from './PrivateHeader'

if (Meteor.isClient) {
    describe('PrivateHeader', function() {

        it('should set button text to Logout', function() {
            const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={() => {}}/>);
            const buttonText = wrapper.find('button').text();
            expect(buttonText).toBe('Logout');
        });

        it('should use title as h1 tag', function() {
            const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={() => {}}/>);
            const buttonText = wrapper.find('h1').text();
            expect(buttonText).toBe('Test Title');
        });

        it('should call handleLogout on click', function() {
            const spy = expect.createSpy();
            const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={spy}/>);
            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalled();
        });

    });
}