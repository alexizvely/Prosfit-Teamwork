(function() {
    'use strict';

    /// mock objects
    var mockShapes = function mockShapes() {
        var shapes = [
            {
            _id: 'something',
            shapename: 'Name',
            color: 'ff55ff',
            dimension_x: 250,
            dimension_y: 325,
            dimension_z: 500,
            status: 'manufacturing',
            shape_type: 'sphere',
            comments: [{
                    author: 'Admin',
                    text: 'This is too big for our printers',
                    audit_info:{
                        created_on: 201106080000,
                        last_edit: 201106080000, //milliseconds since Unix Epoch
                        is_deleted: 0, //Boolean
                    }
                }],
            author_id: '1',
            audit_info:{
                    created_on: 201106080000, //milliseconds since Unix Epoch
                    last_edit: 201106080000, //milliseconds since Unix Epoch
                    is_deleted: 0, //Boolean
                },
            url: '?'
            },
            {
                _id: 'something',
                shapename: 'Name1',
                color: 'ff55ff',
                dimension_x: 250,
                dimension_y: 325,
                dimension_z: 500,
                status: 'saved',
                shape_type: 'sphere',
                comments: [{
                    author: 'Admin',
                    text: 'This is too big for our printers',
                    audit_info:{
                        created_on: 201106080000,
                        last_edit: 201106080000, //milliseconds since Unix Epoch
                        is_deleted: 0, //Boolean
                    }
                }],
                author_id: '2',
                audit_info:{
                    created_on: 201106080000, //milliseconds since Unix Epoch
                    last_edit: 201106080000, //milliseconds since Unix Epoch
                    is_deleted: 0, //Boolean
                },
                url: '?'
            },
            {
                _id: 'something',
                shapename: 'Name2',
                color: 'ff55ff',
                dimension_x: 250,
                dimension_y: 325,
                dimension_z: 500,
                status: 'manufacturing',
                shape_type: 'sphere',
                comments: [{
                    author: 'Admin',
                    text: 'This is too big for our printers',
                    audit_info:{
                        created_on: 201106080000,
                        last_edit: 201106080000, //milliseconds since Unix Epoch
                        is_deleted: 0, //Boolean
                    }
                }],
                author_id: '3',
                audit_info:{
                    created_on: 201106080000, //milliseconds since Unix Epoch
                    last_edit: 201106080000, //milliseconds since Unix Epoch
                    is_deleted: 0, //Boolean
                },
                url: '?'
            },
            {
                _id: 'something',
                shapename: 'Name3',
                color: 'ff55ff',
                dimension_x: 250,
                dimension_y: 325,
                dimension_z: 500,
                status: 'saved',
                shape_type: 'sphere',
                comments: [{
                    author: 'Admin',
                    text: 'This is too big for our printers',
                    audit_info:{
                        created_on: 201106080000,
                        last_edit: 201106080000, //milliseconds since Unix Epoch
                        is_deleted: 0, //Boolean
                    }
                }],
                author_id: '1',
                audit_info:{
                    created_on: 201106080000, //milliseconds since Unix Epoch
                    last_edit: 201106080000, //milliseconds since Unix Epoch
                    is_deleted: 0, //Boolean
                },
                url: '?'
            },
            {
                _id: 'something',
                shapename: 'Name4',
                color: 'ff55ff',
                dimension_x: 250,
                dimension_y: 325,
                dimension_z: 500,
                status: 'manufacturing',
                shape_type: 'sphere',
                comments: [{
                    author: 'Admin',
                    text: 'This is too big for our printers',
                    audit_info:{
                        created_on: 201106080000,
                        last_edit: 201106080000, //milliseconds since Unix Epoch
                        is_deleted: 0, //Boolean
                    }
                }],
                author_id: '2',
                audit_info:{
                    created_on: 201106080000, //milliseconds since Unix Epoch
                    last_edit: 201106080000, //milliseconds since Unix Epoch
                    is_deleted: 0, //Boolean
                },
                url: '?'
            },
            {
                _id: 'something',
                shapename: 'Name5',
                color: 'ff55ff',
                dimension_x: 250,
                dimension_y: 325,
                dimension_z: 500,
                status: 'manufacturing',
                shape_type: 'sphere',
                comments: [{
                    author: 'Admin',
                    text: 'This is too big for our printers',
                    audit_info:{
                        created_on: 201106080000,
                        last_edit: 201106080000, //milliseconds since Unix Epoch
                        is_deleted: 0, //Boolean
                    }
                }],
                author_id: '3',
                audit_info:{
                    created_on: 201106080000, //milliseconds since Unix Epoch
                    last_edit: 201106080000, //milliseconds since Unix Epoch
                    is_deleted: 0, //Boolean
                },
                url: '?'
            }
        ];

        return {
            shapes: shapes
        };
    };

    angular
        .module('pando-3d.layout.services')
        .factory('mockShapes', [mockShapes]);
}());
