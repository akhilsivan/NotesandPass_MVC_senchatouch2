Ext.define("NotesandPasswords.model.Passwordmodel", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        identifier:'uuid',
        autoLoad:true,
        autoSync:true,
        proxy: {
            type: 'localstorage',
            id: 'password-app-store'
        },
        fields: [
            { name: 'id', type: 'int' },
            { name: 'dateCreated', type: 'date', dateFormat: 'c' },
            { name: 'title', type: 'string' },
            { name: 'narrative', type: 'string' }
        ],
        validations: [
	     //   { type: 'presence', field: 'id' },
	     //   { type: 'presence', field: 'dateCreated' },
	        { type: 'presence', field: 'title', message: 'Please enter a title for this password.' }
	      ],
    }
});