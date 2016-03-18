Ext.define("NotesandPasswords.view.PasswordList", {
    extend: "Ext.dataview.List",
    xtype:'passwordlist',
    alias: "widget.passwordlist",
    config: {
        store:'Passwordstore',
        layout:'fit',
        loadingText: "Loading Passwords...",
        emptyText: "<div class=\"notes-list-empty-text\">No Passwords found.</div>",
        onItemDisclosure: true,
        itemTpl: "<div class=\"list-item-title\">{title}</div><div class=\"list-item-narrative\">{narrative}</div>"        
    }
});