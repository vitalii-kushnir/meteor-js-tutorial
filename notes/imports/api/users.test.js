import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import {validateNewUser} from "./users";

if (Meteor.isServer) {
    describe("users", function() {

        it("should allow valid email address", function() {
            const testUser = {
                emails : [{
                    address : 'test@test.com'
                }]
            };
            const result = validateNewUser(testUser);
            expect(result).toBe(true);
        });

        it("should reject invalid email", function() {
            expect(()=> {
                const testUser = {};
                validateNewUser(testUser)
            }).toThrow()
        });

    });
}

