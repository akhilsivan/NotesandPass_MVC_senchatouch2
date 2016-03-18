Ext.define("NotesandPasswords.view.NotesList", {
    extend: "Ext.dataview.List",
    xtype:'noteslist',
    alias: "widget.noteslist",
    config: {
        store:'Notesstore',
        layout:'fit',
        loadingText: "Loading Notes...",
        emptyText: "<div class=\"notes-list-empty-text\">No notes found.</div>",
        onItemDisclosure: true,
        itemTpl: "<div class=\"list-item-title\">{title}</div><div class=\"list-item-narrative\">{narrative}</div>"        
    }
});