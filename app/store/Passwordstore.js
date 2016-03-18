Ext.define("NotesandPasswords.store.Passwordstore", {
    extend: "Ext.data.Store",
   requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        autoLoad: true,
        autoSync: true,
        model: "NotesandPasswords.model.Passwordmodel",
        grouper : function(record) {
            return record.get('title')[0];
        },
        proxy: {
            type: 'localstorage',
            id: 'password-app-store'
        },
        sorters: [{ property: 'dateCreated', direction: 'DESC'}]
    }
});