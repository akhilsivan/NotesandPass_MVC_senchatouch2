Ext.define("NotesandPasswords.view.NoteEditor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.noteeditor",
    xtype:'noteeditor',
    config:{
        scrollable:'vertical',
        title: 'NOTES',    
items:[{    
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'EDIT NOTE'},{ 
                  layout:'hbox',
                    docked:'bottom',
                    items:[
               {  
    	    xtype: "button",
            margin:'10px 0px 0px 0px',
    	    ui:'confirm',
    	    text: "DISCARD",
            width:'50%',
            id:'btndelete',
            handler: this.onDeleteButtonTap,
    	    scope: this
    	},{
    	    xtype: "button",
            margin:'10px 0px 0px 0px',
    	    ui:'confirm',
    	    text: "SAVE",
            width:'50%',
            id:'btnsave',
            handler: this.onSaveButtonTap,
    	    scope: this

    	}]},
 /*
        var topToolbar = {
            xtype: "toolbar",
            docked: "bottom",
            items: [                        
            ]
     };
*/
    /*    var deleteButton = {
            xtype: "button",
            margin:'10px 0px 0px 0px',
            iconCls: "trash",
            iconMask: true,
            handler: this.onDeleteButtonTap,
            scope: this
        };
*/
 {
           xtype: 'textfield',
            name: 'title',
            label: 'Title',
            id:'noteeditortitle',
           required: true
        },{
            xtype: 'textareafield',
            name: 'narrative',
            id:'noteeditornarrative',
            label: 'Narrative'
        }
]

},
initialize:function() {
this.callParent(arguments); 
    },
    onSaveButtonTap: function () {
        console.log("saveNoteCommand");
        this.fireEvent("saveNoteCommand", this);
    },
    onBackButtonTap: function () {
    	console.log("backButtonCommand");
    	this.fireEvent("backButtonCommand", this);
    },
    onDeleteButtonTap: function () {
    	console.log("deleteButtonCommand");
    	this.fireEvent("deleteButtonCommand");
    }
});