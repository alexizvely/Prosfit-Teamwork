(function() {
    'use strict';

    var mockUsers = function mockUsers() {
        var users = [
            {
                _id: '1',
                name: 'John Doe',
                email: 'john@gmail.com',
                password: '32rqfuahef0q83hrf', // this is a hash.
                audit_info:{
                    created_on: 201106080000, //milliseconds since Unix Epoch
                    last_edit: 201106080000, //milliseconds since Unix Epoch
                    is_deleted: 0, //Boolean
                }
            },
            {
                _id: '2',
                name: 'John Doe2',
                email: 'john2@gmail.com',
                password: '32rqfuahef0q83hrf', // this is a hash.
                audit_info:{
                    created_on: 201106080000, //milliseconds since Unix Epoch
                    last_edit: 201106080000, //milliseconds since Unix Epoch
                    is_deleted: 0, //Boolean
                }
            },
            {
                _id: '3',
                name: 'John Doe3',
                email: 'john3@gmail.com',
                password: '32rqfuahef0q83hrf', // this is a hash.
                audit_info:{
                    created_on: 201106080000, //milliseconds since Unix Epoch
                    last_edit: 201106080000, //milliseconds since Unix Epoch
                    is_deleted: 0, //Boolean
                }
            }
        ];

        return {
            users: users
        };
    };

    angular
        .module('pando3d.services')
        .factory('mockUsers', [mockUsers]);
}());

