import * as JSONAPI from 'jsonapi-typescript';

// ✅ This should be OK
let doc: JSONAPI.Document = {
    data: {
        type: 'articles',
        id: '1'
    }
};

// ⛔️ This should NOT be OK ("result" is not a valid JSON:API top-level key)
let doc: JSONAPI.Document = {
    result: "Success!"
};

// ⛔️ This should NOT be OK ( empty Array is not a valid JSON:API document )
let doc: JSONAPI.Document = [];
