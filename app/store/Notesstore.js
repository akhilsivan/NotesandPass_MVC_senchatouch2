Ext.define("NotesandPasswords.store.Notesstore", {
    extend: "Ext.data.Store",
    xtype:'notesstore',
   requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        autoLoad: true,
        autoSync: true,
        model: "NotesandPasswords.model.Notesmodel",
        grouper : function(record) {
            return record.get('title')[0];
        },
        proxy: {
            type: 'localstorage',
            id: 'notes-app-store'
        },
        sorters: [{ property: 'dateCreated', direction: 'DESC'}]
    }
});