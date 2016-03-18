Ext.define('NotesandPasswords.view.Notesview', {
    extend: 'Ext.form.FieldSet',
    xtype: 'notesview',
    alias: "widget.notesview",
  requires: ['Ext.Button'],
   config: {
       layout:'fit', 
       model:'Notesmodel',     
        title: 'NOTES',          
         items: [{ 
              xtype: 'noteslist',
            listeners: {
                disclose: { fn: this.onNotesListDisclose, scope: this }
            }  
                },{ 
                  layout:'hbox',
                    docked:'bottom',
                    items:[
               {                   
                    xtype: 'button',
                    text: 'ADD',
                    id:'btnadd',                
                     width:'100%',
                    ui:'confirm',
                    action : 'noteeditor'                     
                }       ] 
                  }     
                	]                
               },
               
                                                  
initialize:function() {
this.callParent(arguments);    
  
},
    onNewButtonTap: function () {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    }
});