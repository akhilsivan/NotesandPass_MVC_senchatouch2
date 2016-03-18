Ext.define('NotesandPasswords.view.Passwordview', {
    extend: 'Ext.form.FieldSet',
    xtype: 'passwordview',
    alias: "widget.passwordview",
  requires: ['Ext.Button'],
   config: {
       layout:'fit', 
       model:'Passwordmodel',     
        title: 'PASSWORDS',          
         items: [{ 
              xtype: 'passwordlist',
            listeners: {
                disclose: { fn: this.onPasswordListDisclose, scope: this }
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
                    action : 'passwordeditor'                     
                }       ] 
                  }     
                	]                
               },
               
                                                  
initialize:function() {
this.callParent(arguments);    
  
},
    onNewButtonTap: function () {
        console.log("newPasswordCommand");
        this.fireEvent("newPasswordCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editPasswordCommand");
        this.fireEvent('editPasswordCommand', this, record);
    }
});