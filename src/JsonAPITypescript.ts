import * as JSONAPI from 'jsonapi-typescript';

// ✅ This should be OK
let doc: JSONAPI.Document = {
    data: {
        type: 'articles',
        id: '1'
    }
};