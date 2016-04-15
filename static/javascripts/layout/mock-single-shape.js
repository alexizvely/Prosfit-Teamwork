(function() {
    'use strict';

    /// mock object
    var mockSingleShape = function mockSingleShape() {
        var shape =
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
            };

        return {
            shape: shape
        };
    };

    angular
        .module('pando-3d.layout.services')
        .factory('mockSingleShape', [mockSingleShape]);
}());
