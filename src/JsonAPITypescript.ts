import * as JSONAPI from 'jsonapi-typescript';

// ✅ This should be OK
const doc: JSONAPI.Document = {
    data: {
        id: '1',
        type: 'articles'
    }
};
