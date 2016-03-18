Ext.define("NotesandPasswords.model.Notesmodel", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        identifier:'uuid',
        autoLoad:true,
        autoSync:true,
        proxy: {
            type: 'localstorage',
            id: 'notes-app-store'
        },
        fields: [
            { name: 'id', type: 'int' },
            { name: 'dateCreated', type: 'date', dateFormat: 'c' },
            { name: 'title', type: 'string' },
            { name: 'narrative', type: 'string' }
        ],
        validations: [
	       // { type: 'presence', field: 'id' },
	       // { type: 'presence', field: 'dateCreated' },
	        { type: 'presence', field: 'title', message: 'Please enter a title for this note.' }
         // {type: 'format',field: 'narrative',matcher: /[0-9A-Za-z]{6,15}/,message: 'Note should be alphanumeric'}
           
	      ],
    }
});