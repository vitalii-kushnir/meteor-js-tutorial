import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import {Notes} from './notes';

if (Meteor.isServer) {

    describe('notes', function() {

        const noteOne = {
            _id : "id_1",
            title : 'title_1',
            body : 'body 1',
            updatedAt : 0,
            userId : 'userId_1'
        };

        const noteTwo = {
            _id : "id_2",
            title : 'title_2',
            body : 'body 2',
            updatedAt : 0,
            userId : 'userId_2'
        };

        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });

        it('should insert new note', function() {
            const userId = 'test1234';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
            const result = Notes.findOne({_id, userId});
            expect(result).toExist();
        });

        it('should not insert new note if not authenticated', function() {
            expect(()=> {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('should should remove note', function() {
            Meteor.server.method_handlers['notes.remove'].apply({userId : noteOne.userId}, [noteOne._id]);
            expect(Notes.findOne({_id : noteOne._id})).toNotExist();
        });

        it('should remove not if unauthenticated', function() {
            expect(()=> {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
            }).toThrow()
        });

        it('should not remove node if invalid id', function() {
            expect(()=> {
                Meteor.server.method_handlers['notes.remove'].apply({userId : noteOne.userId});
            }).toThrow()
        });

        it('should update note', function() {
            const title = 'New Title';
            Meteor.server.method_handlers['notes.update'].apply({userId : noteOne.userId}, [
                noteOne._id,
                {title}
            ]);

            const result = Notes.findOne(noteOne._id);
            expect(result.updatedAt).toBeGreaterThan(0);
            expect(result).toInclude({
                title,
                body : noteOne.body
            });
        });

        it('should throw error if extra updates', function() {
            const text = "text";
            expect(()=> {
                Meteor.server.method_handlers['notes.update'].apply({userId : noteOne.userId}, [
                    noteOne._id,
                    {text}
                ]);
            }).toThrow();
        });

        it('should not update note if user was not creator', function() {
            const title = 'New Title';
            Meteor.server.method_handlers['notes.update'].apply({userId : "xxx-xxx"}, [
                noteOne._id,
                {title}
            ]);
            const result = Notes.findOne(noteOne._id);
            expect(result).toInclude(noteOne);
        });

        it('should return a users notes', function() {
            const result = Meteor.server.publish_handlers.notes.apply({userId : noteOne.userId});
            const notes = result.fetch();
            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it('should return zero notes for user that has none', function() {
            const result = Meteor.server.publish_handlers.notes.apply({userId : "xxx-xxx"});
            const notes = result.fetch();
            expect(notes.length).toBe(0);
        });
    })
}
