const traverse = require('../lib/xmlToJson');
const mockData = require('./mockXML').MOCK_DATA;
const clean = require('../lib/cleanXML');


describe('TRAVERSE: With Attributes', ()=>{
    const attributeMode = true;


    it('should collect all 3 attributes of the "employee" tag', ()=>{

        const cleanXML = clean(mockData.TEST1)
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee : {
                id: "12345",
                building: '1',
                geo: "US",
                name: "Alex"
            }
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result));
    });

    it('should create an array if the same tag exist on the same level', ()=>{
        //const cleanXML = mockData.TEST2.replace(/>\s*</g, '><');
        const cleanXML = clean(mockData.TEST2)
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee: [
                {
                    id: '12345',
                    name: 'Alex',
                },
                {
                    id: '56789',
                    name: 'Jon'
                }
            ]
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result));
    });

    it('should parse xml without attributes even if attributeMode is enabled', ()=>{
        const cleanXML = clean(mockData.TEST3)
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee: {
                name: 'Alex',
                age: '25'
            }
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result))
    })

    it('should read the single attribute', ()=>{
        const cleanXML = clean(mockData.TEST4)
        const json = traverse(cleanXML,attributeMode);
        
        const result = {
            employee: {
                id: '12345'
            }
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result))
    });

    it('should pass sanity check', ()=>{

        const cleanXML = clean(mockData.TEST5)
        const converted = traverse(cleanXML, attributeMode);

        const result = {
            employee: {
                name: "Alex"
            },
            role: "Software Dev",
            locality: {
                country: "US",
                region: "TX",
                city: "Austin"
            }
        }

        expect(JSON.stringify(converted)).toBe(JSON.stringify(result));
    })

    it('should create an array of employees where each contain an array of names', ()=>{
        const cleanXML = clean(mockData.TEST6);
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee: [
                {
                    id: "12345",
                    name: [
                        { type: 'first', textNode: 'Alex'},
                        { type: 'last',  textNode: 'La Bianca'}
                    ]
                        
                    
                },
                {
                    id: "98765",
                    name: [
                        { type: 'first', textNode: 'Ash'},
                        { type: 'last',  textNode: 'Thrasher'}
                    ]
                },
                {
                    id: "12332",
                    name: [
                        { type: 'first', textNode: 'Jon'},
                        { type: 'last',  textNode: 'Andrews'}
                    ]
                }
            ]
        };

        expect(JSON.stringify(json)).toBe(JSON.stringify(result))
    });


    it('should create an object with xml key that contains one property which is an array of length 3', ()=>{
        const cleanXML = clean(mockData.TEST7);
        const json = traverse(cleanXML,attributeMode);

        const result = {
            xml: {
                employee: [
                    {
                        id: '123',
                        name: 'alex'
                    },
                    {
                        id: '456',
                        name: 'jon'
                    },
                    {
                        id: '789',
                        name: 'ashley'
                    }
                ]
            }
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result))
    });

    it('should process an array like element if it is out of order', ()=>{
        const cleanXML = clean(mockData.TEST8);
        const json = traverse(cleanXML,attributeMode);

        const result = {
            xml: {
                employee: [
                    {name: 'Alex'},
                    {name: 'Troy'}
                ],
                location: 'US'
            }
        };

        expect(JSON.stringify(json)).toBe(JSON.stringify(result));
    })

    it('should process a single xml element', ()=>{
        const cleanXML = clean(mockData.TEST9);
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee: {
                id: "98765",
                textNode: "Alex"
            }
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result));
    })


});









describe('TRAVERSE: Without Attributes', ()=>{
    const attributeMode = false;

    it('should not collect any attributes', ()=>{
        const cleanXML = clean(mockData.TEST1)
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee : {
                name: "Alex"
            }
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result));
    });

    it('should creeate an array', ()=>{
        const cleanXML = clean(mockData.TEST2)
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee: [
                {
                    name: 'Alex',
                },
                {
                    name: 'Jon'
                }
            ]
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result));
    });

    it('should not read the single attribute', ()=>{
        const cleanXML = clean(mockData.TEST4)
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee: ""
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result))
    });


    it('should create an array of employees where each contain an array of names', ()=>{
        const cleanXML = clean(mockData.TEST6);
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee: [
                {
                    name: [
                        "Alex",
                        "La Bianca"
                    ]
                        
                    
                },
                {
                    name: [
                        "Ash",
                        "Thrasher"
                    ]
                },
                {
                    name: [
                        "Jon",
                        "Andrews"
                    ]
                }
            ]
        };

        expect(JSON.stringify(json)).toBe(JSON.stringify(result))
    })

    it('should create an object with xml key that contains one property which is an array of length 3', ()=>{
        const cleanXML = clean(mockData.TEST7);
        const json = traverse(cleanXML,attributeMode);

        const result = {
            xml: {
                employee: ""
            }
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result))
    });

    it('should process a single xml element', ()=>{
        const cleanXML = clean(mockData.TEST9);
        const json = traverse(cleanXML,attributeMode);

        const result = {
            employee: "Alex"
        }

        expect(JSON.stringify(json)).toBe(JSON.stringify(result));
    })
});

